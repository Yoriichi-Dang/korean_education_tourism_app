import React from "react";
import BackgroundLayout from "@/components/common/BackgroundLayout";
import { TopConversationList } from "@/components/home/conversation/TopConversationList";
import ConversationList from "@/components/home/conversation/ConversationList";
const Page = () => {
  return (
    <BackgroundLayout style={{ padding: 15 }}>
      <ConversationList />
      <TopConversationList />
    </BackgroundLayout>
  );
};

export default Page;
