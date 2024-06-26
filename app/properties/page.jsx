// Component
import Properties from "@/components/Properties";
import PropertySearchForm from "@/components/PropertySearchForm";

const PropertiesPage = async () => {
  return (
    <>
      <section className="bg-blue-700 py-4">
        <div className="max-w-7xl mx-auto px-4 flex flex-col item start sm:px-6 lg:px-">
          <PropertySearchForm />
        </div>
      </section>
      <Properties />
    </>
  );
};

export default PropertiesPage;
