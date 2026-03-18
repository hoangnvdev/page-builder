import { Image } from './index';

export default {
  title: "Primitives/Image",
  component: Image,
  tags: ["autodocs"],
  argTypes: {
    fit: {
      control: "select",
      options: ["cover", "contain", "fill", "none", "scale-down"],
    },
    position: {
      control: "text",
    },
  },
};

export const Default = {
  args: {
    src: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?w=600",
    alt: "Landscape",
  },
};

export const ObjectFitModes = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <div>
        <h4 style={{ marginBottom: "0.5rem" }}>Cover (default)</h4>
        <Image
          src="https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?w=600"
          alt="Cover"
          fit="cover"
          width={400}
          height={200}
        />
      </div>
      <div>
        <h4 style={{ marginBottom: "0.5rem" }}>Contain</h4>
        <div style={{ backgroundColor: "#f3f4f6", display: "inline-block" }}>
          <Image
            src="https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?w=600"
            alt="Contain"
            fit="contain"
            width={400}
            height={200}
          />
        </div>
      </div>
      <div>
        <h4 style={{ marginBottom: "0.5rem" }}>Fill</h4>
        <Image
          src="https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?w=600"
          alt="Fill"
          fit="fill"
          width={400}
          height={200}
        />
      </div>
      <div>
        <h4 style={{ marginBottom: "0.5rem" }}>None</h4>
        <div style={{ backgroundColor: "#f3f4f6", display: "inline-block" }}>
          <Image
            src="https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?w=300&h=150"
            alt="None"
            fit="none"
            width={400}
            height={200}
          />
        </div>
      </div>
      <div>
        <h4 style={{ marginBottom: "0.5rem" }}>Scale Down</h4>
        <div style={{ backgroundColor: "#f3f4f6", display: "inline-block" }}>
          <Image
            src="https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?w=300&h=150"
            alt="Scale Down"
            fit="scale-down"
            width={400}
            height={200}
          />
        </div>
      </div>
    </div>
  ),
};

export const CustomSizes = {
  render: () => (
    <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
      <Image
        src="https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=400"
        alt="Small"
        width={150}
        height={150}
      />
      <Image
        src="https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=400"
        alt="Medium"
        width={250}
        height={250}
      />
      <Image
        src="https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=400"
        alt="Large"
        width={350}
        height={350}
      />
    </div>
  ),
};

export const AspectRatios = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <div>
        <h4 style={{ marginBottom: "0.5rem" }}>Square (1:1)</h4>
        <Image
          src="https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?w=600"
          alt="Square"
          width={300}
          height={300}
        />
      </div>
      <div>
        <h4 style={{ marginBottom: "0.5rem" }}>Landscape (16:9)</h4>
        <Image
          src="https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?w=600"
          alt="Landscape"
          width={400}
          height={225}
        />
      </div>
      <div>
        <h4 style={{ marginBottom: "0.5rem" }}>Portrait (9:16)</h4>
        <Image
          src="https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?w=600"
          alt="Portrait"
          width={225}
          height={400}
        />
      </div>
      <div>
        <h4 style={{ marginBottom: "0.5rem" }}>Wide (21:9)</h4>
        <Image
          src="https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?w=600"
          alt="Wide"
          width={500}
          height={214}
        />
      </div>
    </div>
  ),
};

export const ObjectPosition = {
  render: () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "1rem",
      }}
    >
      <div>
        <p style={{ marginBottom: "0.5rem", textAlign: "center" }}>Top</p>
        <Image
          src="https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?w=600"
          alt="Top"
          width={200}
          height={150}
          position="top"
        />
      </div>
      <div>
        <p style={{ marginBottom: "0.5rem", textAlign: "center" }}>Center</p>
        <Image
          src="https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?w=600"
          alt="Center"
          width={200}
          height={150}
          position="center"
        />
      </div>
      <div>
        <p style={{ marginBottom: "0.5rem", textAlign: "center" }}>Bottom</p>
        <Image
          src="https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?w=600"
          alt="Bottom"
          width={200}
          height={150}
          position="bottom"
        />
      </div>
      <div>
        <p style={{ marginBottom: "0.5rem", textAlign: "center" }}>Left</p>
        <Image
          src="https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?w=600"
          alt="Left"
          width={200}
          height={150}
          position="left"
        />
      </div>
      <div>
        <p style={{ marginBottom: "0.5rem", textAlign: "center" }}>Right</p>
        <Image
          src="https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?w=600"
          alt="Right"
          width={200}
          height={150}
          position="right"
        />
      </div>
    </div>
  ),
};

export const DefaultImage = {
  render: () => (
    <div>
      <p style={{ marginBottom: "1rem" }}>
        When no src is provided, a default placeholder image is shown:
      </p>
      <Image alt="Default placeholder" width={300} height={200} />
    </div>
  ),
};

export const ImageGrid = {
  render: () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
        gap: "1rem",
      }}
    >
      {[
        "photo-1506748686214-e9df14d4d9d0",
        "photo-1518791841217-8f162f1e1131",
        "photo-1472099645785-5658abf4ff4e",
        "photo-1494790108377-be9c29b29330",
        "photo-1507003211169-0a1dd7228f2d",
        "photo-1438761681033-6461ffad8d80",
      ].map((id, index) => (
        <Image
          key={id}
          src={`https://images.unsplash.com/${id}?w=400&h=300&fit=crop`}
          alt={`Gallery image ${index + 1}`}
          width="100%"
          height={200}
        />
      ))}
    </div>
  ),
};

export const ProductImages = {
  render: () => (
    <div style={{ display: "flex", gap: "1rem" }}>
      <div style={{ flex: "0 0 100px" }}>
        <div
          style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
        >
          {[1, 2, 3, 4].map((i) => (
            <Image
              key={i}
              src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400"
              alt={`Thumbnail ${i}`}
              width={100}
              height={100}
              style={{
                cursor: "pointer",
                border: i === 1 ? "2px solid #3b82f6" : "2px solid transparent",
              }}
            />
          ))}
        </div>
      </div>
      <div style={{ flex: 1 }}>
        <Image
          src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800"
          alt="Main product"
          width="100%"
          height={500}
        />
      </div>
    </div>
  ),
};
