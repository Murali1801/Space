import React, { useState } from "react";
import { useEditorStore } from "~/lib/store";

interface ProductPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (productId: string) => void;
}

export function ProductPickerModal({ isOpen, onClose, onSelect }: ProductPickerModalProps) {
  const [products, setProducts] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    if (isOpen) {
      fetchProducts();
    }
  }, [isOpen]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch("/app/products");
      const data = await response.json();
      setProducts(data.products || []);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (productId: string) => {
    onSelect(productId);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: "#fff",
          borderRadius: "8px",
          padding: "24px",
          maxWidth: "800px",
          maxHeight: "80vh",
          overflow: "auto",
          width: "90%",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
          <h2 style={{ margin: 0 }}>Select Product</h2>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              fontSize: "24px",
              cursor: "pointer",
            }}
          >
            ×
          </button>
        </div>

        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            width: "100%",
            padding: "8px 12px",
            border: "1px solid #ddd",
            borderRadius: "4px",
            marginBottom: "16px",
          }}
        />

        {loading ? (
          <div style={{ textAlign: "center", padding: "40px" }}>Loading...</div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
              gap: "16px",
            }}
          >
            {products
              .filter((product) =>
                product.title.toLowerCase().includes(searchQuery.toLowerCase())
              )
              .map((product) => (
                <div
                  key={product.id}
                  onClick={() => handleSelect(product.id)}
                  style={{
                    border: "1px solid #ddd",
                    padding: "16px",
                    borderRadius: "8px",
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "#0066cc";
                    e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.1)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "#ddd";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  {product.images?.edges?.[0] && (
                    <img
                      src={product.images.edges[0].node.url}
                      alt={product.images.edges[0].node.altText || product.title}
                      style={{ width: "100%", height: "auto", borderRadius: "4px", marginBottom: "8px" }}
                    />
                  )}
                  <h3 style={{ fontSize: "14px", margin: "0 0 4px 0" }}>{product.title}</h3>
                  {product.priceRange && (
                    <p style={{ fontSize: "12px", color: "#666", margin: 0 }}>
                      {product.priceRange.minVariantPrice.amount}{" "}
                      {product.priceRange.minVariantPrice.currencyCode}
                    </p>
                  )}
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}

