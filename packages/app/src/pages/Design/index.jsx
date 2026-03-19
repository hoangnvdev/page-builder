import { EditorProvider } from "@/contexts";
import { withErrorBoundary } from "@/hocs";

import { Editor } from "../../components/editor/Editor";

const DesignPageComponent = () => {
  return (
    <EditorProvider>
      <Editor />
    </EditorProvider>
  );
};

export const DesignPage = withErrorBoundary(DesignPageComponent, {
  fallbackType: "page",
});
