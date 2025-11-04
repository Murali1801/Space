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
        backgroundColor: "#ffffff",
        color: "#374151",
        border: "1px solid #e5e7eb",
        borderRadius: "6px",
        cursor: fetcher.state === "submitting" ? "wait" : "pointer",
        fontWeight: "500",
        fontSize: "13px",
        transition: "all 0.2s",
      }}
      onMouseEnter={(e) => {
        if (fetcher.state !== "submitting") {
          e.currentTarget.style.backgroundColor = "#f9fafb";
          e.currentTarget.style.borderColor = "#d1d5db";
        }
      }}
      onMouseLeave={(e) => {
        if (fetcher.state !== "submitting") {
          e.currentTarget.style.backgroundColor = "#ffffff";
          e.currentTarget.style.borderColor = "#e5e7eb";
        }
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
        backgroundColor: "#10b981",
        color: "#ffffff",
        border: "none",
        borderRadius: "6px",
        cursor: fetcher.state === "submitting" ? "wait" : "pointer",
        fontWeight: "600",
        fontSize: "13px",
        transition: "all 0.2s",
        boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
      }}
      onMouseEnter={(e) => {
        if (fetcher.state !== "submitting") {
          e.currentTarget.style.backgroundColor = "#059669";
        }
      }}
      onMouseLeave={(e) => {
        if (fetcher.state !== "submitting") {
          e.currentTarget.style.backgroundColor = "#10b981";
        }
      }}
    >
      {fetcher.state === "submitting" ? "Publishing..." : "Publish"}
    </button>
  );
}