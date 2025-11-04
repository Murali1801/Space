import { useFetcher } from "@remix-run/react";
import { useEditorStore } from "~/lib/store";

export function SaveButton() {
  const { pageContent } = useEditorStore();
  const fetcher = useFetcher();

  const handleSave = () => {
    if (!pageContent) return;

    fetcher.submit(
      {
        action: "save",
        content: JSON.stringify(pageContent),
        title: "Untitled Page",
      },
      {
        method: "POST",
        action: "/app/api/save",
      }
    );
  };

  return (
    <button
      onClick={handleSave}
      disabled={fetcher.state === "submitting"}
      style={{
        padding: "8px 16px",
        backgroundColor: "#0066cc",
        color: "#fff",
        border: "none",
        borderRadius: "4px",
        cursor: fetcher.state === "submitting" ? "wait" : "pointer",
        fontWeight: "600",
      }}
    >
      {fetcher.state === "submitting" ? "Saving..." : "Save"}
    </button>
  );
}

export function PublishButton() {
  const { pageContent } = useEditorStore();
  const fetcher = useFetcher();

  const handlePublish = () => {
    if (!pageContent) return;

    fetcher.submit(
      {
        action: "publish",
        content: JSON.stringify(pageContent),
        title: "Untitled Page",
      },
      {
        method: "POST",
        action: "/app/api/save",
      }
    );
  };

  return (
    <button
      onClick={handlePublish}
      disabled={fetcher.state === "submitting"}
      style={{
        padding: "8px 16px",
        backgroundColor: "#00aa00",
        color: "#fff",
        border: "none",
        borderRadius: "4px",
        cursor: fetcher.state === "submitting" ? "wait" : "pointer",
        fontWeight: "600",
      }}
    >
      {fetcher.state === "submitting" ? "Publishing..." : "Publish"}
    </button>
  );
}

