/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
import { tensor, Tensor } from '@tensorflow/tfjs-core';
import * as tfliteWebAPIClient from './tflite_web_api_client';
const TFHUB_SEARCH_PARAM = '?lite-format=tflite';
/**
 * A `tflite.TFLiteModel` is built from a TFLite model flatbuffer and executable
 * on TFLite interpreter. To load it, use the `loadTFLiteModel` function below.
 *
 * Sample usage:
 *
 * ```js
 * // Load the MobilenetV2 tflite model from tfhub.
 * const tfliteModel = await tflite.loadTFLiteModel(
 *     'https://tfhub.dev/tensorflow/lite-model/mobilenet_v2_1.0_224/1/metadata/1');
 *
 * const outputTensor = tf.tidy(() => {
 *    // Get pixels data from an image.
 *    let img = tf.browser.fromPixels(document.querySelector('img'));
 *    // Resize and normalize:
 *    img = tf.image.resizeBilinear(img, [224, 224]);
 *    img = tf.sub(tf.div(tf.expandDims(img), 127.5), 1);
 *    // Run the inference.
 *    let outputTensor = tfliteModel.predict(img);
 *    // De-normalize the result.
 *    return tf.mul(tf.add(outputTensor, 1), 127.5)
 *  });
 * console.log(outputTensor);
 *
 * ```
 *
 * @doc {heading: 'Models', subheading: 'Classes'}
 */
export class TFLiteModel {
    constructor(modelRunner) {
        this.modelRunner = modelRunner;
    }
    get inputs() {
        const modelInputs = this.modelRunner.getInputs();
        return this.convertTFLiteTensorInfos(modelInputs);
    }
    get outputs() {
        const modelOutputs = this.modelRunner.getOutputs();
        return this.convertTFLiteTensorInfos(modelOutputs);
    }
    /**
     * Execute the inference for the input tensors.
     *
     * @param inputs The input tensors, when there is single input for the model,
     *     inputs param should be a Tensor. For models with multiple inputs,
     *     inputs params should be in either Tensor[] if the input order is fixed,
     *     or otherwise NamedTensorMap format.
     *
     * @param config Prediction configuration for specifying the batch size.
     *     Currently this field is not used, and batch inference is not supported.
     *
     * @returns Inference result tensors. The output would be single Tensor if
     *     model has single output node, otherwise NamedTensorMap will be returned
     *     for model with multiple outputs. Tensor[] is not used.
     *
     * @doc {heading: 'Models', subheading: 'Classes'}
     */
    predict(inputs, config) {
        const modelInputs = this.modelRunner.getInputs();
        const modelOutputs = this.modelRunner.getOutputs();
        // Set model inputs from the given tensors.
        // A single tensor or a tensor array.
        if (inputs instanceof Tensor || Array.isArray(inputs)) {
            let inputTensors;
            if (inputs instanceof Tensor) {
                inputTensors = [inputs];
            }
            else {
                inputTensors = inputs;
            }
            if (modelInputs.length !== inputTensors.length) {
                throw new Error(`The size of TFLite model inputs (${modelInputs
                    .length}) does not match the size of the input tensors (${inputTensors.length})`);
            }
            for (let i = 0; i < modelInputs.length; i++) {
                this.setModelInputFromTensor(modelInputs[i], inputTensors[i]);
            }
        }
        // Named tensors.
        else {
            const inputTensorNames = Object.keys(inputs);
            const modelInputMap = {};
            modelInputs.forEach(modelInput => {
                modelInputMap[modelInput.name] = modelInput;
            });
            const modelInputNames = Object.keys(modelInputMap);
            this.checkMapInputs(inputTensorNames, modelInputNames);
            for (const name of inputTensorNames) {
                this.setModelInputFromTensor(modelInputMap[name], inputs[name]);
            }
        }
        // Run inference.
        const success = this.modelRunner.infer();
        if (!success) {
            throw new Error('Failed running inference');
        }
        // Convert model outputs to tensors.
        const outputTensors = {};
        for (let i = 0; i < modelOutputs.length; i++) {
            const modelOutput = modelOutputs[i];
            let data = modelOutput.data();
            // Convert TFLite tensor types that are not supported by TFJS to
            // compatible types.
            switch (modelOutput.dataType) {
                case 'int8':
                case 'int16':
                case 'uint32':
                    data = Int32Array.from(data);
                    break;
                case 'float64':
                    console.warn(`WARNING: converting output tensor from 'float64' to 'float32'`);
                    data = Float32Array.from(data);
                    break;
                default:
                    break;
            }
            const outputTensor = tensor(data, this.getShapeFromTFLiteTensorInfo(modelOutput));
            outputTensors[modelOutput.name] = outputTensor;
        }
        const names = Object.keys(outputTensors);
        return names.length === 1 ? outputTensors[names[0]] : outputTensors;
    }
    /**
     * Execute the inference for the input tensors and return activation
     * values for specified output node names without batching.
     *
     * @param inputs The input tensors, when there is single input for the model,
     *     inputs param should be a Tensor. For models with multiple inputs,
     *     inputs params should be in either Tensor[] if the input order is fixed,
     *     or otherwise NamedTensorMap format.
     *
     * @param outputs string|string[]. List of output node names to retrieve
     *     activation from.
     *
     * @returns Activation values for the output nodes result tensors. The return
     *     type matches specified parameter outputs type. The output would be
     *     single Tensor if single output is specified, otherwise Tensor[] for
     *     multiple outputs.
     */
    execute(inputs, outputs) {
        throw new Error('execute() of TFLiteModel is not supported yet.');
    }
    getProfilingResults() {
        return this.modelRunner.getProfilingResults();
    }
    getProfilingSummary() {
        return this.modelRunner.getProfilingSummary();
    }
    setModelInputFromTensor(modelInput, tensor) {
        // String and complex tensors are not supported.
        if (tensor.dtype === 'string' || tensor.dtype === 'complex64') {
            throw new Error(`Data type '${tensor.dtype}' not supported.`);
        }
        // Check shape.
        //
        // At this point, we've already checked that input tensors and model inputs
        // have the same size.
        const modelInputShape = modelInput.shape.split(',').map(dim => Number(dim));
        if (!tensor.shape.every((dim, index) => modelInputShape[index] === -1 ||
            modelInputShape[index] === dim)) {
            throw new Error(`Input tensor shape mismatch: expect '${modelInput.shape}', got '${tensor.shape.join(',')}'.`);
        }
        // Check types.
        switch (modelInput.dataType) {
            // All 'bool' and 'int' tflite types accpet 'bool' or 'int32' tfjs types.
            // Will throw error for 'float32' tfjs type.
            case 'bool':
            case 'int8':
            case 'uint8':
            case 'int16':
            case 'uint32':
            case 'int32':
                if (tensor.dtype === 'float32') {
                    throw this.getDataTypeMismatchError(modelInput.dataType, tensor.dtype);
                }
                else if (modelInput.dataType !== tensor.dtype) {
                    console.warn(`WARNING: converting '${tensor.dtype}' to '${modelInput.dataType}'`);
                }
                break;
            // All 'float' tflite types accept all tfjs types.
            case 'float32':
            case 'float64':
                if (modelInput.dataType !== tensor.dtype) {
                    console.warn(`WARNING: converting '${tensor.dtype}' to '${modelInput.dataType}'`);
                }
                break;
            default:
                break;
        }
        const modelInputBuffer = modelInput.data();
        switch (modelInput.dataType) {
            case 'int8':
                modelInputBuffer.set(Int8Array.from(tensor.dataSync()));
                break;
            case 'uint8':
            case 'bool':
                modelInputBuffer.set(Uint8Array.from(tensor.dataSync()));
                break;
            case 'int16':
                modelInputBuffer.set(Int16Array.from(tensor.dataSync()));
                break;
            case 'int32':
                modelInputBuffer.set(Int32Array.from(tensor.dataSync()));
                break;
            case 'uint32':
                modelInputBuffer.set(Uint32Array.from(tensor.dataSync()));
                break;
            case 'float32':
                modelInputBuffer.set(Float32Array.from(tensor.dataSync()));
                break;
            case 'float64':
                modelInputBuffer.set(Float64Array.from(tensor.dataSync()));
                break;
            default:
                break;
        }
    }
    convertTFLiteTensorInfos(infos) {
        return infos.map(info => {
            const dtype = getDTypeFromTFLiteType(info.dataType);
            return {
                name: info.name,
                shape: this.getShapeFromTFLiteTensorInfo(info),
                dtype,
            };
        });
    }
    checkMapInputs(inputTensorNames, modelInputNames) {
        const notInModel = inputTensorNames.filter(name => !modelInputNames.includes(name));
        const notInInput = modelInputNames.filter(name => !inputTensorNames.includes(name));
        if (notInModel.length === 0 && notInInput.length === 0) {
            return;
        }
        const msgParts = ['The model input names don\'t match the model input names.'];
        if (notInModel.length > 0) {
            msgParts.push(`Names in input but missing in model: [${notInModel}].`);
        }
        if (notInInput.length > 0) {
            msgParts.push(`Names in model but missing in inputs: [${notInInput}].`);
        }
        throw new Error(msgParts.join(' '));
    }
    getShapeFromTFLiteTensorInfo(info) {
        return info.shape.split(',').map(s => Number(s));
    }
    getDataTypeMismatchError(expected, got) {
        return new Error(`Data type mismatch: input tensor expects '${expected}', got '${got}'`);
    }
}
/**
 * Loads a TFLiteModel from the given model url.
 *
 * @param model The path to the model (string), or the model content in memory
 *     (ArrayBuffer).
 * @param options Options related to model inference.
 *
 * @doc {heading: 'Models', subheading: 'Loading'}
 */
export async function loadTFLiteModel(model, options) {
    // Handle tfhub links.
    if (typeof model === 'string' && model.includes('tfhub.dev') &&
        model.includes('lite-model') && !model.endsWith(TFHUB_SEARCH_PARAM)) {
        model = `${model}${TFHUB_SEARCH_PARAM}`;
    }
    const tfliteModelRunner = await tfliteWebAPIClient.tfweb.TFLiteWebModelRunner.create(model, options);
    return new TFLiteModel(tfliteModelRunner);
}
/**
 * Returns the compatible tfjs DataType from the given TFLite data type.
 *
 * @param tfliteType The type in TFLite.
 *
 * @doc {heading: 'Models', subheading: 'Utilities'}
 */
export function getDTypeFromTFLiteType(tfliteType) {
    let dtype;
    switch (tfliteType) {
        case 'float32':
        case 'float64':
            dtype = 'float32';
            break;
        case 'int8':
        case 'uint8':
        case 'int16':
        case 'int32':
        case 'uint32':
            dtype = 'int32';
            break;
        case 'bool':
            dtype = 'bool';
            break;
        default:
            break;
    }
    return dtype;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGZsaXRlX21vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vdGZqcy10ZmxpdGUvc3JjL3RmbGl0ZV9tb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7O0dBZUc7QUFFSCxPQUFPLEVBQWdGLE1BQU0sRUFBRSxNQUFNLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUVwSSxPQUFPLEtBQUssa0JBQWtCLE1BQU0seUJBQXlCLENBQUM7QUFHOUQsTUFBTSxrQkFBa0IsR0FBRyxxQkFBcUIsQ0FBQztBQUVqRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBMkJHO0FBQ0gsTUFBTSxPQUFPLFdBQVc7SUFDdEIsWUFBNkIsV0FBaUM7UUFBakMsZ0JBQVcsR0FBWCxXQUFXLENBQXNCO0lBQUcsQ0FBQztJQUVsRSxJQUFJLE1BQU07UUFDUixNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ2pELE9BQU8sSUFBSSxDQUFDLHdCQUF3QixDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ3BELENBQUM7SUFFRCxJQUFJLE9BQU87UUFDVCxNQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ25ELE9BQU8sSUFBSSxDQUFDLHdCQUF3QixDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQ3JELENBQUM7SUFFRDs7Ozs7Ozs7Ozs7Ozs7OztPQWdCRztJQUNILE9BQU8sQ0FBQyxNQUFzQyxFQUFFLE1BQTJCO1FBRXpFLE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDakQsTUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUVuRCwyQ0FBMkM7UUFFM0MscUNBQXFDO1FBQ3JDLElBQUksTUFBTSxZQUFZLE1BQU0sSUFBSSxLQUFLLENBQUMs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R0FBRyxPQUFPLENBQUM7WUFDaEIsTUFBTTtRQUNSLEtBQUssTUFBTTtZQUNULEtBQUssR0FBRyxNQUFNLENBQUM7WUFDZixNQUFNO1FBQ1I7WUFDRSxNQUFNO0tBQ1Q7SUFDRCxPQUFPLEtBQUssQ0FBQztBQUNmLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAyMSBHb29nbGUgTExDLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICovXG5cbmltcG9ydCB7RGF0YVR5cGUsIEluZmVyZW5jZU1vZGVsLCBNb2RlbFByZWRpY3RDb25maWcsIE1vZGVsVGVuc29ySW5mbywgTmFtZWRUZW5zb3JNYXAsIHRlbnNvciwgVGVuc29yfSBmcm9tICdAdGVuc29yZmxvdy90ZmpzLWNvcmUnO1xuXG5pbXBvcnQgKiBhcyB0ZmxpdGVXZWJBUElDbGllbnQgZnJvbSAnLi90ZmxpdGVfd2ViX2FwaV9jbGllbnQnO1xuaW1wb3J0IHtQcm9maWxlSXRlbSwgVEZMaXRlRGF0YVR5cGUsIFRGTGl0ZVdlYk1vZGVsUnVubmVyLCBURkxpdGVXZWJNb2RlbFJ1bm5lck9wdGlvbnMsIFRGTGl0ZVdlYk1vZGVsUnVubmVyVGVuc29ySW5mb30gZnJvbSAnLi90eXBlcy90ZmxpdGVfd2ViX21vZGVsX3J1bm5lcic7XG5cbmNvbnN0IFRGSFVCX1NFQVJDSF9QQVJBTSA9ICc/bGl0ZS1mb3JtYXQ9dGZsaXRlJztcblxuLyoqXG4gKiBBIGB0ZmxpdGUuVEZMaXRlTW9kZWxgIGlzIGJ1aWx0IGZyb20gYSBURkxpdGUgbW9kZWwgZmxhdGJ1ZmZlciBhbmQgZXhlY3V0YWJsZVxuICogb24gVEZMaXRlIGludGVycHJldGVyLiBUbyBsb2FkIGl0LCB1c2UgdGhlIGBsb2FkVEZMaXRlTW9kZWxgIGZ1bmN0aW9uIGJlbG93LlxuICpcbiAqIFNhbXBsZSB1c2FnZTpcbiAqXG4gKiBgYGBqc1xuICogLy8gTG9hZCB0aGUgTW9iaWxlbmV0VjIgdGZsaXRlIG1vZGVsIGZyb20gdGZodWIuXG4gKiBjb25zdCB0ZmxpdGVNb2RlbCA9IGF3YWl0IHRmbGl0ZS5sb2FkVEZMaXRlTW9kZWwoXG4gKiAgICAgJ2h0dHBzOi8vdGZodWIuZGV2L3RlbnNvcmZsb3cvbGl0ZS1tb2RlbC9tb2JpbGVuZXRfdjJfMS4wXzIyNC8xL21ldGFkYXRhLzEnKTtcbiAqXG4gKiBjb25zdCBvdXRwdXRUZW5zb3IgPSB0Zi50aWR5KCgpID0+IHtcbiAqICAgIC8vIEdldCBwaXhlbHMgZGF0YSBmcm9tIGFuIGltYWdlLlxuICogICAgbGV0IGltZyA9IHRmLmJyb3dzZXIuZnJvbVBpeGVscyhkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdpbWcnKSk7XG4gKiAgICAvLyBSZXNpemUgYW5kIG5vcm1hbGl6ZTpcbiAqICAgIGltZyA9IHRmLmltYWdlLnJlc2l6ZUJpbGluZWFyKGltZywgWzIyNCwgMjI0XSk7XG4gKiAgICBpbWcgPSB0Zi5zdWIodGYuZGl2KHRmLmV4cGFuZERpbXMoaW1nKSwgMTI3LjUpLCAxKTtcbiAqICAgIC8vIFJ1biB0aGUgaW5mZXJlbmNlLlxuICogICAgbGV0IG91dHB1dFRlbnNvciA9IHRmbGl0ZU1vZGVsLnByZWRpY3QoaW1nKTtcbiAqICAgIC8vIERlLW5vcm1hbGl6ZSB0aGUgcmVzdWx0LlxuICogICAgcmV0dXJuIHRmLm11bCh0Zi5hZGQob3V0cHV0VGVuc29yLCAxKSwgMTI3LjUpXG4gKiAgfSk7XG4gKiBjb25zb2xlLmxvZyhvdXRwdXRUZW5zb3IpO1xuICpcbiAqIGBgYFxuICpcbiAqIEBkb2Mge2hlYWRpbmc6ICdNb2RlbHMnLCBzdWJoZWFkaW5nOiAnQ2xhc3Nlcyd9XG4gKi9cbmV4cG9ydCBjbGFzcyBURkxpdGVNb2RlbCBpbXBsZW1lbnRzIEluZmVyZW5jZU1vZGVsIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSByZWFkb25seSBtb2RlbFJ1bm5lcjogVEZMaXRlV2ViTW9kZWxSdW5uZXIpIHt9XG5cbiAgZ2V0IGlucHV0cygpOiBNb2RlbFRlbnNvckluZm9bXSB7XG4gICAgY29uc3QgbW9kZWxJbnB1dHMgPSB0aGlzLm1vZGVsUnVubmVyLmdldElucHV0cygpO1xuICAgIHJldHVybiB0aGlzLmNvbnZlcnRURkxpdGVUZW5zb3JJbmZvcyhtb2RlbElucHV0cyk7XG4gIH1cblxuICBnZXQgb3V0cHV0cygpOiBNb2RlbFRlbnNvckluZm9bXSB7XG4gICAgY29uc3QgbW9kZWxPdXRwdXRzID0gdGhpcy5tb2RlbFJ1bm5lci5nZXRPdXRwdXRzKCk7XG4gICAgcmV0dXJuIHRoaXMuY29udmVydFRGTGl0ZVRlbnNvckluZm9zKG1vZGVsT3V0cHV0cyk7XG4gIH1cblxuICAvKipcbiAgICogRXhlY3V0ZSB0aGUgaW5mZXJlbmNlIGZvciB0aGUgaW5wdXQgdGVuc29ycy5cbiAgICpcbiAgICogQHBhcmFtIGlucHV0cyBUaGUgaW5wdXQgdGVuc29ycywgd2hlbiB0aGVyZSBpcyBzaW5nbGUgaW5wdXQgZm9yIHRoZSBtb2RlbCxcbiAgICogICAgIGlucHV0cyBwYXJhbSBzaG91bGQgYmUgYSBUZW5zb3IuIEZvciBtb2RlbHMgd2l0aCBtdWx0aXBsZSBpbnB1dHMsXG4gICAqICAgICBpbnB1dHMgcGFyYW1zIHNob3VsZCBiZSBpbiBlaXRoZXIgVGVuc29yW10gaWYgdGhlIGlucHV0IG9yZGVyIGlzIGZpeGVkLFxuICAgKiAgICAgb3Igb3RoZXJ3aXNlIE5hbWVkVGVuc29yTWFwIGZvcm1hdC5cbiAgICpcbiAgICogQHBhcmFtIGNvbmZpZyBQcmVkaWN0aW9uIGNvbmZpZ3VyYXRpb24gZm9yIHNwZWNpZnlpbmcgdGhlIGJhdGNoIHNpemUuXG4gICAqICAgICBDdXJyZW50bHkgdGhpcyBmaWVsZCBpcyBub3QgdXNlZCwgYW5kIGJhdGNoIGluZmVyZW5jZSBpcyBub3Qgc3VwcG9ydGVkLlxuICAgKlxuICAgKiBAcmV0dXJucyBJbmZlcmVuY2UgcmVzdWx0IHRlbnNvcnMuIFRoZSBvdXRwdXQgd291bGQgYmUgc2luZ2xlIFRlbnNvciBpZlxuICAgKiAgICAgbW9kZWwgaGFzIHNpbmdsZSBvdXRwdXQgbm9kZSwgb3RoZXJ3aXNlIE5hbWVkVGVuc29yTWFwIHdpbGwgYmUgcmV0dXJuZWRcbiAgICogICAgIGZvciBtb2RlbCB3aXRoIG11bHRpcGxlIG91dHB1dHMuIFRlbnNvcltdIGlzIG5vdCB1c2VkLlxuICAgKlxuICAgKiBAZG9jIHtoZWFkaW5nOiAnTW9kZWxzJywgc3ViaGVhZGluZzogJ0NsYXNzZXMnfVxuICAgKi9cbiAgcHJlZGljdChpbnB1dHM6IFRlbnNvcnxUZW5zb3JbXXxOYW1lZFRlbnNvck1hcCwgY29uZmlnPzogTW9kZWxQcmVkaWN0Q29uZmlnKTpcbiAgICAgIFRlbnNvcnxUZW5zb3JbXXxOYW1lZFRlbnNvck1hcCB7XG4gICAgY29uc3QgbW9kZWxJbnB1dHMgPSB0aGlzLm1vZGVsUnVubmVyLmdldElucHV0cygpO1xuICAgIGNvbnN0IG1vZGVsT3V0cHV0cyA9IHRoaXMubW9kZWxSdW5uZXIuZ2V0T3V0cHV0cygpO1xuXG4gICAgLy8gU2V0IG1vZGVsIGlucHV0cyBmcm9tIHRoZSBnaXZlbiB0ZW5zb3JzLlxuXG4gICAgLy8gQSBzaW5nbGUgdGVuc29yIG9yIGEgdGVuc29yIGFycmF5LlxuICAgIGlmIChpbnB1dHMgaW5zdGFuY2VvZiBUZW5zb3IgfHwgQXJyYXkuaXNBcnJheShpbnB1dHMpKSB7XG4gICAgICBsZXQgaW5wdXRUZW5zb3JzOiBUZW5zb3JbXTtcbiAgICAgIGlmIChpbnB1dHMgaW5zdGFuY2VvZiBUZW5zb3IpIHtcbiAgICAgICAgaW5wdXRUZW5zb3JzID0gW2lucHV0c107XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpbnB1dFRlbnNvcnMgPSBpbnB1dHM7XG4gICAgICB9XG4gICAgICBpZiAobW9kZWxJbnB1dHMubGVuZ3RoICE9PSBpbnB1dFRlbnNvcnMubGVuZ3RoKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgVGhlIHNpemUgb2YgVEZMaXRlIG1vZGVsIGlucHV0cyAoJHtcbiAgICAgICAgICAgIG1vZGVsSW5wdXRzXG4gICAgICAgICAgICAgICAgLmxlbmd0aH0pIGRvZXMgbm90IG1hdGNoIHRoZSBzaXplIG9mIHRoZSBpbnB1dCB0ZW5zb3JzICgke1xuICAgICAgICAgICAgaW5wdXRUZW5zb3JzLmxlbmd0aH0pYCk7XG4gICAgICB9XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG1vZGVsSW5wdXRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHRoaXMuc2V0TW9kZWxJbnB1dEZyb21UZW5zb3IobW9kZWxJbnB1dHNbaV0sIGlucHV0VGVuc29yc1tpXSk7XG4gICAgICB9XG4gICAgfVxuICAgIC8vIE5hbWVkIHRlbnNvcnMuXG4gICAgZWxzZSB7XG4gICAgICBjb25zdCBpbnB1dFRlbnNvck5hbWVzID0gT2JqZWN0LmtleXMoaW5wdXRzKTtcbiAgICAgIGNvbnN0IG1vZGVsSW5wdXRNYXA6XG4gICAgICAgICAge1tuYW1lOiBzdHJpbmddOiBURkxpdGVXZWJNb2RlbFJ1bm5lclRlbnNvckluZm99ID0ge307XG4gICAgICBtb2RlbElucHV0cy5mb3JFYWNoKG1vZGVsSW5wdXQgPT4ge1xuICAgICAgICBtb2RlbElucHV0TWFwW21vZGVsSW5wdXQubmFtZV0gPSBtb2RlbElucHV0O1xuICAgICAgfSk7XG4gICAgICBjb25zdCBtb2RlbElucHV0TmFtZXMgPSBPYmplY3Qua2V5cyhtb2RlbElucHV0TWFwKTtcbiAgICAgIHRoaXMuY2hlY2tNYXBJbnB1dHMoaW5wdXRUZW5zb3JOYW1lcywgbW9kZWxJbnB1dE5hbWVzKTtcbiAgICAgIGZvciAoY29uc3QgbmFtZSBvZiBpbnB1dFRlbnNvck5hbWVzKSB7XG4gICAgICAgIHRoaXMuc2V0TW9kZWxJbnB1dEZyb21UZW5zb3IobW9kZWxJbnB1dE1hcFtuYW1lXSwgaW5wdXRzW25hbWVdKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBSdW4gaW5mZXJlbmNlLlxuICAgIGNvbnN0IHN1Y2Nlc3MgPSB0aGlzLm1vZGVsUnVubmVyLmluZmVyKCk7XG4gICAgaWYgKCFzdWNjZXNzKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ZhaWxlZCBydW5uaW5nIGluZmVyZW5jZScpO1xuICAgIH1cblxuICAgIC8vIENvbnZlcnQgbW9kZWwgb3V0cHV0cyB0byB0ZW5zb3JzLlxuICAgIGNvbnN0IG91dHB1dFRlbnNvcnM6IE5hbWVkVGVuc29yTWFwID0ge307XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtb2RlbE91dHB1dHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IG1vZGVsT3V0cHV0ID0gbW9kZWxPdXRwdXRzW2ldO1xuICAgICAgbGV0IGRhdGEgPSBtb2RlbE91dHB1dC5kYXRhKCk7XG5cbiAgICAgIC8vIENvbnZlcnQgVEZMaXRlIHRlbnNvciB0eXBlcyB0aGF0IGFyZSBub3Qgc3VwcG9ydGVkIGJ5IFRGSlMgdG9cbiAgICAgIC8vIGNvbXBhdGlibGUgdHlwZXMuXG4gICAgICBzd2l0Y2ggKG1vZGVsT3V0cHV0LmRhdGFUeXBlKSB7XG4gICAgICAgIGNhc2UgJ2ludDgnOlxuICAgICAgICBjYXNlICdpbnQxNic6XG4gICAgICAgIGNhc2UgJ3VpbnQzMic6XG4gICAgICAgICAgZGF0YSA9IEludDMyQXJyYXkuZnJvbShkYXRhKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnZmxvYXQ2NCc6XG4gICAgICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICAgICAgICBgV0FSTklORzogY29udmVydGluZyBvdXRwdXQgdGVuc29yIGZyb20gJ2Zsb2F0NjQnIHRvICdmbG9hdDMyJ2ApO1xuICAgICAgICAgIGRhdGEgPSBGbG9hdDMyQXJyYXkuZnJvbShkYXRhKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNvbnN0IG91dHB1dFRlbnNvciA9XG4gICAgICAgICAgdGVuc29yKGRhdGEsIHRoaXMuZ2V0U2hhcGVGcm9tVEZMaXRlVGVuc29ySW5mbyhtb2RlbE91dHB1dCkpO1xuICAgICAgb3V0cHV0VGVuc29yc1ttb2RlbE91dHB1dC5uYW1lXSA9IG91dHB1dFRlbnNvcjtcbiAgICB9XG4gICAgY29uc3QgbmFtZXMgPSBPYmplY3Qua2V5cyhvdXRwdXRUZW5zb3JzKTtcbiAgICByZXR1cm4gbmFtZXMubGVuZ3RoID09PSAxID8gb3V0cHV0VGVuc29yc1tuYW1lc1swXV0gOiBvdXRwdXRUZW5zb3JzO1xuICB9XG5cbiAgLyoqXG4gICAqIEV4ZWN1dGUgdGhlIGluZmVyZW5jZSBmb3IgdGhlIGlucHV0IHRlbnNvcnMgYW5kIHJldHVybiBhY3RpdmF0aW9uXG4gICAqIHZhbHVlcyBmb3Igc3BlY2lmaWVkIG91dHB1dCBub2RlIG5hbWVzIHdpdGhvdXQgYmF0Y2hpbmcuXG4gICAqXG4gICAqIEBwYXJhbSBpbnB1dHMgVGhlIGlucHV0IHRlbnNvcnMsIHdoZW4gdGhlcmUgaXMgc2luZ2xlIGlucHV0IGZvciB0aGUgbW9kZWwsXG4gICAqICAgICBpbnB1dHMgcGFyYW0gc2hvdWxkIGJlIGEgVGVuc29yLiBGb3IgbW9kZWxzIHdpdGggbXVsdGlwbGUgaW5wdXRzLFxuICAgKiAgICAgaW5wdXRzIHBhcmFtcyBzaG91bGQgYmUgaW4gZWl0aGVyIFRlbnNvcltdIGlmIHRoZSBpbnB1dCBvcmRlciBpcyBmaXhlZCxcbiAgICogICAgIG9yIG90aGVyd2lzZSBOYW1lZFRlbnNvck1hcCBmb3JtYXQuXG4gICAqXG4gICAqIEBwYXJhbSBvdXRwdXRzIHN0cmluZ3xzdHJpbmdbXS4gTGlzdCBvZiBvdXRwdXQgbm9kZSBuYW1lcyB0byByZXRyaWV2ZVxuICAgKiAgICAgYWN0aXZhdGlvbiBmcm9tLlxuICAgKlxuICAgKiBAcmV0dXJucyBBY3RpdmF0aW9uIHZhbHVlcyBmb3IgdGhlIG91dHB1dCBub2RlcyByZXN1bHQgdGVuc29ycy4gVGhlIHJldHVyblxuICAgKiAgICAgdHlwZSBtYXRjaGVzIHNwZWNpZmllZCBwYXJhbWV0ZXIgb3V0cHV0cyB0eXBlLiBUaGUgb3V0cHV0IHdvdWxkIGJlXG4gICAqICAgICBzaW5nbGUgVGVuc29yIGlmIHNpbmdsZSBvdXRwdXQgaXMgc3BlY2lmaWVkLCBvdGhlcndpc2UgVGVuc29yW10gZm9yXG4gICAqICAgICBtdWx0aXBsZSBvdXRwdXRzLlxuICAgKi9cbiAgZXhlY3V0ZShpbnB1dHM6IFRlbnNvcnxUZW5zb3JbXXxOYW1lZFRlbnNvck1hcCwgb3V0cHV0czogc3RyaW5nfHN0cmluZ1tdKTpcbiAgICAgIFRlbnNvcnxUZW5zb3JbXSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdleGVjdXRlKCkgb2YgVEZMaXRlTW9kZWwgaXMgbm90IHN1cHBvcnRlZCB5ZXQuJyk7XG4gIH1cblxuICBnZXRQcm9maWxpbmdSZXN1bHRzKCk6IFByb2ZpbGVJdGVtW10ge1xuICAgIHJldHVybiB0aGlzLm1vZGVsUnVubmVyLmdldFByb2ZpbGluZ1Jlc3VsdHMoKTtcbiAgfVxuXG4gIGdldFByb2ZpbGluZ1N1bW1hcnkoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5tb2RlbFJ1bm5lci5nZXRQcm9maWxpbmdTdW1tYXJ5KCk7XG4gIH1cblxuICBwcml2YXRlIHNldE1vZGVsSW5wdXRGcm9tVGVuc29yKFxuICAgICAgbW9kZWxJbnB1dDogVEZMaXRlV2ViTW9kZWxSdW5uZXJUZW5zb3JJbmZvLCB0ZW5zb3I6IFRlbnNvcikge1xuICAgIC8vIFN0cmluZyBhbmQgY29tcGxleCB0ZW5zb3JzIGFyZSBub3Qgc3VwcG9ydGVkLlxuICAgIGlmICh0ZW5zb3IuZHR5cGUgPT09ICdzdHJpbmcnIHx8IHRlbnNvci5kdHlwZSA9PT0gJ2NvbXBsZXg2NCcpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgRGF0YSB0eXBlICcke3RlbnNvci5kdHlwZX0nIG5vdCBzdXBwb3J0ZWQuYCk7XG4gICAgfVxuXG4gICAgLy8gQ2hlY2sgc2hhcGUuXG4gICAgLy9cbiAgICAvLyBBdCB0aGlzIHBvaW50LCB3ZSd2ZSBhbHJlYWR5IGNoZWNrZWQgdGhhdCBpbnB1dCB0ZW5zb3JzIGFuZCBtb2RlbCBpbnB1dHNcbiAgICAvLyBoYXZlIHRoZSBzYW1lIHNpemUuXG4gICAgY29uc3QgbW9kZWxJbnB1dFNoYXBlID0gbW9kZWxJbnB1dC5zaGFwZS5zcGxpdCgnLCcpLm1hcChkaW0gPT4gTnVtYmVyKGRpbSkpO1xuICAgIGlmICghdGVuc29yLnNoYXBlLmV2ZXJ5KFxuICAgICAgICAgICAgKGRpbSwgaW5kZXgpID0+IG1vZGVsSW5wdXRTaGFwZVtpbmRleF0gPT09IC0xIHx8XG4gICAgICAgICAgICAgICAgbW9kZWxJbnB1dFNoYXBlW2luZGV4XSA9PT0gZGltKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbnB1dCB0ZW5zb3Igc2hhcGUgbWlzbWF0Y2g6IGV4cGVjdCAnJHtcbiAgICAgICAgICBtb2RlbElucHV0LnNoYXBlfScsIGdvdCAnJHt0ZW5zb3Iuc2hhcGUuam9pbignLCcpfScuYCk7XG4gICAgfVxuXG4gICAgLy8gQ2hlY2sgdHlwZXMuXG4gICAgc3dpdGNoIChtb2RlbElucHV0LmRhdGFUeXBlKSB7XG4gICAgICAvLyBBbGwgJ2Jvb2wnIGFuZCAnaW50JyB0ZmxpdGUgdHlwZXMgYWNjcGV0ICdib29sJyBvciAnaW50MzInIHRmanMgdHlwZXMuXG4gICAgICAvLyBXaWxsIHRocm93IGVycm9yIGZvciAnZmxvYXQzMicgdGZqcyB0eXBlLlxuICAgICAgY2FzZSAnYm9vbCc6XG4gICAgICBjYXNlICdpbnQ4JzpcbiAgICAgIGNhc2UgJ3VpbnQ4JzpcbiAgICAgIGNhc2UgJ2ludDE2JzpcbiAgICAgIGNhc2UgJ3VpbnQzMic6XG4gICAgICBjYXNlICdpbnQzMic6XG4gICAgICAgIGlmICh0ZW5zb3IuZHR5cGUgPT09ICdmbG9hdDMyJykge1xuICAgICAgICAgIHRocm93IHRoaXMuZ2V0RGF0YVR5cGVNaXNtYXRjaEVycm9yKFxuICAgICAgICAgICAgICBtb2RlbElucHV0LmRhdGFUeXBlLCB0ZW5zb3IuZHR5cGUpO1xuICAgICAgICB9IGVsc2UgaWYgKG1vZGVsSW5wdXQuZGF0YVR5cGUgIT09IHRlbnNvci5kdHlwZSkge1xuICAgICAgICAgIGNvbnNvbGUud2FybihgV0FSTklORzogY29udmVydGluZyAnJHt0ZW5zb3IuZHR5cGV9JyB0byAnJHtcbiAgICAgICAgICAgICAgbW9kZWxJbnB1dC5kYXRhVHlwZX0nYCk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICAvLyBBbGwgJ2Zsb2F0JyB0ZmxpdGUgdHlwZXMgYWNjZXB0IGFsbCB0ZmpzIHR5cGVzLlxuICAgICAgY2FzZSAnZmxvYXQzMic6XG4gICAgICBjYXNlICdmbG9hdDY0JzpcbiAgICAgICAgaWYgKG1vZGVsSW5wdXQuZGF0YVR5cGUgIT09IHRlbnNvci5kdHlwZSkge1xuICAgICAgICAgIGNvbnNvbGUud2FybihgV0FSTklORzogY29udmVydGluZyAnJHt0ZW5zb3IuZHR5cGV9JyB0byAnJHtcbiAgICAgICAgICAgICAgbW9kZWxJbnB1dC5kYXRhVHlwZX0nYCk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICBjb25zdCBtb2RlbElucHV0QnVmZmVyID0gbW9kZWxJbnB1dC5kYXRhKCk7XG4gICAgc3dpdGNoIChtb2RlbElucHV0LmRhdGFUeXBlKSB7XG4gICAgICBjYXNlICdpbnQ4JzpcbiAgICAgICAgbW9kZWxJbnB1dEJ1ZmZlci5zZXQoSW50OEFycmF5LmZyb20odGVuc29yLmRhdGFTeW5jKCkpKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICd1aW50OCc6XG4gICAgICBjYXNlICdib29sJzpcbiAgICAgICAgbW9kZWxJbnB1dEJ1ZmZlci5zZXQoVWludDhBcnJheS5mcm9tKHRlbnNvci5kYXRhU3luYygpKSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnaW50MTYnOlxuICAgICAgICBtb2RlbElucHV0QnVmZmVyLnNldChJbnQxNkFycmF5LmZyb20odGVuc29yLmRhdGFTeW5jKCkpKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdpbnQzMic6XG4gICAgICAgIG1vZGVsSW5wdXRCdWZmZXIuc2V0KEludDMyQXJyYXkuZnJvbSh0ZW5zb3IuZGF0YVN5bmMoKSkpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3VpbnQzMic6XG4gICAgICAgIG1vZGVsSW5wdXRCdWZmZXIuc2V0KFVpbnQzMkFycmF5LmZyb20odGVuc29yLmRhdGFTeW5jKCkpKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdmbG9hdDMyJzpcbiAgICAgICAgbW9kZWxJbnB1dEJ1ZmZlci5zZXQoRmxvYXQzMkFycmF5LmZyb20odGVuc29yLmRhdGFTeW5jKCkpKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdmbG9hdDY0JzpcbiAgICAgICAgbW9kZWxJbnB1dEJ1ZmZlci5zZXQoRmxvYXQ2NEFycmF5LmZyb20odGVuc29yLmRhdGFTeW5jKCkpKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGNvbnZlcnRURkxpdGVUZW5zb3JJbmZvcyhpbmZvczogVEZMaXRlV2ViTW9kZWxSdW5uZXJUZW5zb3JJbmZvW10pOlxuICAgICAgTW9kZWxUZW5zb3JJbmZvW10ge1xuICAgIHJldHVybiBpbmZvcy5tYXAoaW5mbyA9PiB7XG4gICAgICBjb25zdCBkdHlwZSA9IGdldERUeXBlRnJvbVRGTGl0ZVR5cGUoaW5mby5kYXRhVHlwZSk7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBuYW1lOiBpbmZvLm5hbWUsXG4gICAgICAgIHNoYXBlOiB0aGlzLmdldFNoYXBlRnJvbVRGTGl0ZVRlbnNvckluZm8oaW5mbyksXG4gICAgICAgIGR0eXBlLFxuICAgICAgfTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgY2hlY2tNYXBJbnB1dHMoXG4gICAgICBpbnB1dFRlbnNvck5hbWVzOiBzdHJpbmdbXSwgbW9kZWxJbnB1dE5hbWVzOiBzdHJpbmdbXSkge1xuICAgIGNvbnN0IG5vdEluTW9kZWwgPVxuICAgICAgICBpbnB1dFRlbnNvck5hbWVzLmZpbHRlcihuYW1lID0+ICFtb2RlbElucHV0TmFtZXMuaW5jbHVkZXMobmFtZSkpO1xuICAgIGNvbnN0IG5vdEluSW5wdXQgPVxuICAgICAgICBtb2RlbElucHV0TmFtZXMuZmlsdGVyKG5hbWUgPT4gIWlucHV0VGVuc29yTmFtZXMuaW5jbHVkZXMobmFtZSkpO1xuICAgIGlmIChub3RJbk1vZGVsLmxlbmd0aCA9PT0gMCAmJiBub3RJbklucHV0Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IG1zZ1BhcnRzID1cbiAgICAgICAgWydUaGUgbW9kZWwgaW5wdXQgbmFtZXMgZG9uXFwndCBtYXRjaCB0aGUgbW9kZWwgaW5wdXQgbmFtZXMuJ107XG4gICAgaWYgKG5vdEluTW9kZWwubGVuZ3RoID4gMCkge1xuICAgICAgbXNnUGFydHMucHVzaChgTmFtZXMgaW4gaW5wdXQgYnV0IG1pc3NpbmcgaW4gbW9kZWw6IFske25vdEluTW9kZWx9XS5gKTtcbiAgICB9XG4gICAgaWYgKG5vdEluSW5wdXQubGVuZ3RoID4gMCkge1xuICAgICAgbXNnUGFydHMucHVzaChgTmFtZXMgaW4gbW9kZWwgYnV0IG1pc3NpbmcgaW4gaW5wdXRzOiBbJHtub3RJbklucHV0fV0uYCk7XG4gICAgfVxuICAgIHRocm93IG5ldyBFcnJvcihtc2dQYXJ0cy5qb2luKCcgJykpO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRTaGFwZUZyb21URkxpdGVUZW5zb3JJbmZvKGluZm86IFRGTGl0ZVdlYk1vZGVsUnVubmVyVGVuc29ySW5mbykge1xuICAgIHJldHVybiBpbmZvLnNoYXBlLnNwbGl0KCcsJykubWFwKHMgPT4gTnVtYmVyKHMpKTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0RGF0YVR5cGVNaXNtYXRjaEVycm9yKGV4cGVjdGVkOiBzdHJpbmcsIGdvdDogc3RyaW5nKSB7XG4gICAgcmV0dXJuIG5ldyBFcnJvcihcbiAgICAgICAgYERhdGEgdHlwZSBtaXNtYXRjaDogaW5wdXQgdGVuc29yIGV4cGVjdHMgJyR7ZXhwZWN0ZWR9JywgZ290ICcke2dvdH0nYCk7XG4gIH1cbn1cblxuLyoqXG4gKiBMb2FkcyBhIFRGTGl0ZU1vZGVsIGZyb20gdGhlIGdpdmVuIG1vZGVsIHVybC5cbiAqXG4gKiBAcGFyYW0gbW9kZWwgVGhlIHBhdGggdG8gdGhlIG1vZGVsIChzdHJpbmcpLCBvciB0aGUgbW9kZWwgY29udGVudCBpbiBtZW1vcnlcbiAqICAgICAoQXJyYXlCdWZmZXIpLlxuICogQHBhcmFtIG9wdGlvbnMgT3B0aW9ucyByZWxhdGVkIHRvIG1vZGVsIGluZmVyZW5jZS5cbiAqXG4gKiBAZG9jIHtoZWFkaW5nOiAnTW9kZWxzJywgc3ViaGVhZGluZzogJ0xvYWRpbmcnfVxuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gbG9hZFRGTGl0ZU1vZGVsKFxuICAgIG1vZGVsOiBzdHJpbmd8QXJyYXlCdWZmZXIsXG4gICAgb3B0aW9ucz86IFRGTGl0ZVdlYk1vZGVsUnVubmVyT3B0aW9ucyk6IFByb21pc2U8VEZMaXRlTW9kZWw+IHtcbiAgLy8gSGFuZGxlIHRmaHViIGxpbmtzLlxuICBpZiAodHlwZW9mIG1vZGVsID09PSAnc3RyaW5nJyAmJiBtb2RlbC5pbmNsdWRlcygndGZodWIuZGV2JykgJiZcbiAgICAgIG1vZGVsLmluY2x1ZGVzKCdsaXRlLW1vZGVsJykgJiYgIW1vZGVsLmVuZHNXaXRoKFRGSFVCX1NFQVJDSF9QQVJBTSkpIHtcbiAgICBtb2RlbCA9IGAke21vZGVsfSR7VEZIVUJfU0VBUkNIX1BBUkFNfWA7XG4gIH1cblxuICBjb25zdCB0ZmxpdGVNb2RlbFJ1bm5lciA9XG4gICAgICBhd2FpdCB0ZmxpdGVXZWJBUElDbGllbnQudGZ3ZWIuVEZMaXRlV2ViTW9kZWxSdW5uZXIuY3JlYXRlKFxuICAgICAgICAgIG1vZGVsLCBvcHRpb25zKTtcbiAgcmV0dXJuIG5ldyBURkxpdGVNb2RlbCh0ZmxpdGVNb2RlbFJ1bm5lcik7XG59XG5cbi8qKlxuICogUmV0dXJucyB0aGUgY29tcGF0aWJsZSB0ZmpzIERhdGFUeXBlIGZyb20gdGhlIGdpdmVuIFRGTGl0ZSBkYXRhIHR5cGUuXG4gKlxuICogQHBhcmFtIHRmbGl0ZVR5cGUgVGhlIHR5cGUgaW4gVEZMaXRlLlxuICpcbiAqIEBkb2Mge2hlYWRpbmc6ICdNb2RlbHMnLCBzdWJoZWFkaW5nOiAnVXRpbGl0aWVzJ31cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldERUeXBlRnJvbVRGTGl0ZVR5cGUodGZsaXRlVHlwZTogVEZMaXRlRGF0YVR5cGUpOiBEYXRhVHlwZSB7XG4gIGxldCBkdHlwZTogRGF0YVR5cGU7XG4gIHN3aXRjaCAodGZsaXRlVHlwZSkge1xuICAgIGNhc2UgJ2Zsb2F0MzInOlxuICAgIGNhc2UgJ2Zsb2F0NjQnOlxuICAgICAgZHR5cGUgPSAnZmxvYXQzMic7XG4gICAgICBicmVhaztcbiAgICBjYXNlICdpbnQ4JzpcbiAgICBjYXNlICd1aW50OCc6XG4gICAgY2FzZSAnaW50MTYnOlxuICAgIGNhc2UgJ2ludDMyJzpcbiAgICBjYXNlICd1aW50MzInOlxuICAgICAgZHR5cGUgPSAnaW50MzInO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnYm9vbCc6XG4gICAgICBkdHlwZSA9ICdib29sJztcbiAgICAgIGJyZWFrO1xuICAgIGRlZmF1bHQ6XG4gICAgICBicmVhaztcbiAgfVxuICByZXR1cm4gZHR5cGU7XG59XG4iXX0=