import { memo } from "react";

export const withMemo = (Component, arePropsEqual) => {
  const MemoizedComponent = memo(Component, arePropsEqual);

  MemoizedComponent.displayName = `withMemo(${Component.displayName || Component.name || "Component"})`;

  return MemoizedComponent;
};
