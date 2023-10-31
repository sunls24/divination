import Nav from "@/components/nav";
import Divination from "@/components/divination";

import guaIndex from "@/lib/data/gua-index.json";
import guaList from "@/lib/data/gua-list.json";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <main className="flex flex-col gap-5 sm:gap-8">
      <Nav />
      <Divination guaIndexData={guaIndex} guaListData={guaList} />
      <Footer />
    </main>
  );
}
