const DevideInfo = (props: { name: string; onClick: () => void }) => {
  return <div onClick={props.onClick}>{props.name}</div>;
};

export default DevideInfo;
