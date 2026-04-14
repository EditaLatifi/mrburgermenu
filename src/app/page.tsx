import menu from "@/data/menu.json";
import type { MenuData } from "@/data/types";
import MenuApp from "@/components/MenuApp";

const data = menu as MenuData;

export default function Home() {
  return <MenuApp data={data} />;
}
