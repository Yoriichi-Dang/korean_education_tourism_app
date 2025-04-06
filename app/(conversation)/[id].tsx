import ConversationScreen from "@/screens/conversation/conversation";
import { useLocalSearchParams } from "expo-router";
const Page = () => {
  const { id } = useLocalSearchParams();

  return <ConversationScreen id={parseInt(id as string)} />;
};

export default Page;
