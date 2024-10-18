export default function ProprtyImages({ property }) {
  return (
    <section>
      {property && property.picUrls && property.picUrls.length > 0 && (
        <div>
          <h4 className="font-semibold">Images</h4>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {property.picUrls.map((url, index) => (
              <img
                key={index}
                src={url}
                alt={`Property Image ${index + 1}`}
                className="w-full h-auto rounded-lg shadow-lg"
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
