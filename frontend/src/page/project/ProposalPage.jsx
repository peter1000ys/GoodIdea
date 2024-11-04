import { Helmet } from "react-helmet-async";
import Header from "../../components/common/Header";
import "./ProposalPage.css";

import * as Y from "yjs";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Collaboration from "@tiptap/extension-collaboration";
import { useEffect } from "react";
import { TiptapCollabProvider } from "@hocuspocus/provider";

const doc = new Y.Doc();

function ProposalPage() {
  const editor = useEditor({
    extensions: [
      Document,
      StarterKit,
      Paragraph,
      Text,
      Collaboration.configure({
        document: doc,
      }),
    ],
    // Remove the automatic content addition on editor initialization.
  });

  useEffect(() => {
    const provider = new TiptapCollabProvider({
      url: "ws://192.168.100.129:3000", // Your Websocket URL
      name: "document.name", // Unique document identifier for syncing. This is your document name.
      appId: "7j9y6m10", // Your Cloud Dashboard AppID or `baseURL` for on-premises
      token: "notoken", // Your JWT token
      document: doc,

      // The onSynced callback ensures initial content is set only once using editor.setContent(), preventing repetitive content loading on editor syncs.
      onSynced() {
        if (!doc.getMap("config").get("initialContentLoaded") && editor) {
          doc.getMap("config").set("initialContentLoaded", true);

          editor.commands.setContent(`
          <p>This is a radically reduced version of Tiptap. It has support for a document, with paragraphs and text. That’s it. It’s probably too much for real minimalists though.</p>
          <p>The paragraph extension is not really required, but you need at least one node. Sure, that node can be something different.</p>
          `);
        }
      },
    });
    return () => {
      provider.destroy();
    };
  }, [editor]);

  return (
    <>
      <Helmet>
        <title>기획서</title>
      </Helmet>
      <div className="h-full w-full flex flex-col">
        <Header content="관통 프로젝트" />

        <div className="flex-1 items-center justify-center flex">
          <EditorContent className="w-full h-full" editor={editor} />
        </div>
      </div>
    </>
  );
}

export default ProposalPage;
