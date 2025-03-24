import Header from "./Header";
import CobrosInfo from "./CobrosInfo";
import FacturaCard from "./FacturaCard";
import CobrosRecibidos from "./CobrosRecibidos";
import CobrosTable from "./CobrosTable";
import BackLink from "./BackLink";

export default function Collection() {
  return (
    <div className="bg-gray-0 p-8 rounded-lg w-full max-w-screen-lg mx-auto">
      <Header />
      <main>
        <CobrosInfo />
        <FacturaCard />
        <CobrosRecibidos />
        <CobrosTable />
        <BackLink />
      </main>
    </div>
  );
}
