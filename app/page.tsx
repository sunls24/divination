import Nav from "@/app/components/nav";
import Divination from "@/app/components/divination";

import guaIndex from "./data/gua-index.json";
import guaList from "./data/gua-list.json";
import Footer from "@/app/components/footer";

export default function Home() {
  return (
    <main className="flex flex-col gap-5 sm:gap-8">
      <Nav />
      <Divination guaIndexData={guaIndex} guaListData={guaList} />
      <Footer />
    </main>
  );
}
