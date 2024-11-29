import React from "react";
import styled, { keyframes } from "styled-components";

const twinkle = keyframes`
  0%, 100% {
    opacity: 0.1;
  }
  50% {
    opacity: 0.2;
  }
`;

const PageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(to bottom, #12002f, #29004e, #3e32c6);
  color: white;
  overflow: hidden;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: url("/path/to/stars.png") repeat;
    opacity: 0.1;
    animation: ${twinkle} 20s infinite alternate;
    z-index: 0;
  }
`;

const GlassSection = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.25);
  padding: 2rem;
  z-index: 10;
`;

const Header = styled(GlassSection)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1rem;
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2rem;
  z-index: 10;
`;

const ProductSection = styled.div`
  display: flex;
  gap: 2rem;
`;

const ProductDetails = styled(GlassSection)`
  flex-grow: 1;
`;

const Button = styled.button`
  padding: 1rem 2rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: bold;
  color: white;
  cursor: pointer;
  background: ${(props) =>
    props.gradient
      ? "linear-gradient(to right, #6b46c1, #3182ce)"
      : "rgba(255, 255, 255, 0.1)"};
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  border: none;
  backdrop-filter: blur(6px);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  }
`;

const RelatedProductsSection = styled(GlassSection)`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const RelatedProductCard = styled(GlassSection)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 12rem;
  gap: 1rem;
`;

const ProductPage = () => {
  return (
    <PageContainer>
      {/* Navbar */}
      <Header>
        <img src="/path-to-logo.png" alt="Logo" style={{ width: "3rem" }} />
        <div style={{ display: "flex", gap: "1rem" }}>
          <Button>My Cart</Button>
          <Button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              style={{ width: "1.5rem", height: "1.5rem" }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9V5.25m0 13.5V15m-7.5-6h4.5M6 6h3m1.5-3H21m-3 9h-3M9 12H6m-3 3h12M9 21h3m6-3h3"
              />
            </svg>
          </Button>
        </div>
      </Header>

      {/* Main Content */}
      <MainContent>
        <ProductSection>
          {/* Product Image Section */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div
              style={{
                width: "16rem",
                height: "16rem",
                background: "rgba(255, 255, 255, 0.1)",
                borderRadius: "8px",
                backdropFilter: "blur(6px)",
              }}
            ></div>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              {Array(4)
                .fill(0)
                .map((_, index) => (
                  <div
                    key={index}
                    style={{
                      width: "3rem",
                      height: "3rem",
                      background: "rgba(255, 255, 255, 0.1)",
                      borderRadius: "8px",
                      backdropFilter: "blur(6px)",
                    }}
                  ></div>
                ))}
            </div>
          </div>

          {/* Product Details */}
          <ProductDetails>
            <h1 style={{ fontSize: "2rem", fontWeight: "bold" }}>
              Vastu Consultation Platinum
            </h1>
            <p style={{ color: "rgba(255, 255, 255, 0.6)", marginTop: "0.5rem" }}>
              Certified by Professionals • 4.9/5 ⭐ (120 reviews)
            </p>
            <p style={{ fontSize: "1.5rem", fontWeight: "bold", marginTop: "1rem" }}>
              ₹1,000
            </p>
            <p
              style={{
                textDecoration: "line-through",
                color: "rgba(255, 255, 255, 0.6)",
              }}
            >
              MRP: ₹1,599
            </p>
            <p style={{ marginTop: "1rem" }}>
              Product Size: XYZ. Designed for all your Vastu needs, this package
              provides insights to align your space with positive energies.
            </p>
            <div style={{ marginTop: "2rem", display: "flex", gap: "1rem" }}>
              <Button gradient>Add to Cart</Button>
              <Button>Buy Now</Button>
            </div>
          </ProductDetails>
        </ProductSection>

        {/* Related Products */}
        <RelatedProductsSection>
          <h2 style={{ fontSize: "1.5rem", fontWeight: "bold" }}>Related Products</h2>
          <div style={{ display: "flex", gap: "1rem" }}>
            {Array(3)
              .fill(0)
              .map((_, index) => (
                <RelatedProductCard key={index}>
                  <div
                    style={{
                      width: "8rem",
                      height: "8rem",
                      background: "rgba(255, 255, 255, 0.1)",
                      borderRadius: "8px",
                      backdropFilter: "blur(6px)",
                    }}
                  ></div>
                  <h3 style={{ fontSize: "1.25rem", fontWeight: "bold" }}>
                    Service {index + 1}
                  </h3>
                  <p style={{ color: "rgba(255, 255, 255, 0.6)" }}>
                    Essential service to align energies and goals.
                  </p>
                  <Button gradient>Book Now</Button>
                </RelatedProductCard>
              ))}
          </div>
        </RelatedProductsSection>
      </MainContent>
    </PageContainer>
  );
};

export default ProductPage;
