type propsUndoIcon = {
  className?: string;
  size?: number;
  width?: number;
  height?: number;
  color?: string;
  strokeWidth?: number;
};


export function UndoIcon(props: propsUndoIcon): React.ReactElement {
  const width = props.size || props.width || 21;
  const height = props.size || props.height || 21;
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" stroke={props.color || "currentColor"} strokeWidth={props.strokeWidth || 1} />
      <path d="M3 3v5h5" stroke={props.color || "currentColor"} strokeWidth={props.strokeWidth || 1} />
    </svg>
  )
};
