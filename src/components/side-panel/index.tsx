/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import { useState } from "react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Textarea } from "../ui/textarea";

export default function SidePanel() {
  const [url, setUrl] = useState<string | null>(null);
  const [tabUrl, setTabUrl] = useState<string | null>(null);

  const handleMessages = (
    request: { message: string; data: any },
    _sender: any,
    sendResponse: (message: any) => void
  ) => {
    const { message } = request;
    const { data } = request;
    if (message === "url_change") {
      setUrl(data.url);
      console.log(data);
      sendResponse({ message: "url_change received" });
    } else if (message === "tab_change") {
      setTabUrl(data.tabUrl);
      console.log(data);
      sendResponse({ message: "tab_change received" });
    }
  };

  useEffect(() => {
    chrome.runtime.onMessage.addListener(handleMessages);
    return () => {
      chrome.runtime.onMessage.removeListener(handleMessages);
    };
  });

  return (
    <main className="h-screen p-8 flex flex-col items-start gap-4">
      <p>
        <strong>The Tab URL: </strong> {tabUrl}
      </p>
      <p>
        <strong>
          URL changes inside the current tab this will change only in the
          "youtube.com/watch*" pages:
        </strong>
        {url}
      </p>
      <Button>Shadcn Button</Button>
      <Badge>Shadcn Badge</Badge>
      <Textarea placeholder="Shadcn Textarea" />
    </main>
  );
}
