import { Card } from "./index";

export default {
  title: "Components/Card",
  component: Card,
  tags: ["autodocs"],
  argTypes: {
    hoverable: {
      control: "boolean",
    },
  },
};

export const Basic = {
  args: {
    children: (
      <Card.Content>
        <Card.Title>Card Title</Card.Title>
        <Card.Description>
          This is a basic card component with title and description.
        </Card.Description>
      </Card.Content>
    ),
  },
};

export const WithImage = {
  args: {
    children: (
      <>
        <Card.Image
          src="https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?w=400"
          alt="Sample"
        />
        <Card.Content>
          <Card.Title>Beautiful Landscape</Card.Title>
          <Card.Description>
            A stunning view of nature captured in this photograph.
          </Card.Description>
        </Card.Content>
      </>
    ),
  },
};

export const Hoverable = {
  args: {
    hoverable: true,
    children: (
      <>
        <Card.Image
          src="https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=400"
          alt="Cat"
        />
        <Card.Content>
          <Card.Title>Hoverable Card</Card.Title>
          <Card.Description>
            Hover over this card to see the effect.
          </Card.Description>
        </Card.Content>
      </>
    ),
  },
};

export const Clickable = {
  args: {
    hoverable: true,
    onClick: () => alert("Card clicked!"),
    children: (
      <Card.Content>
        <Card.Title>Clickable Card</Card.Title>
        <Card.Description>Click me to trigger an action!</Card.Description>
      </Card.Content>
    ),
  },
};

export const ContentOnly = {
  args: {
    children: (
      <Card.Content>
        <Card.Title>Text Card</Card.Title>
        <Card.Description>
          A simple card with only text content, no image.
        </Card.Description>
        <p style={{ marginTop: "1rem", color: "#6b7280" }}>
          Additional content can be added easily.
        </p>
      </Card.Content>
    ),
  },
};

export const CardGrid = () => (
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
      gap: "1.5rem",
    }}
  >
    {[1, 2, 3, 4].map((i) => (
      <Card key={i} hoverable>
        <Card.Image
          src={`https://images.unsplash.com/photo-${1500000000000 + i * 1000000}?w=400`}
          alt={`Card ${i}`}
        />
        <Card.Content>
          <Card.Title>Card {i}</Card.Title>
          <Card.Description>
            This is card number {i} in the grid layout.
          </Card.Description>
        </Card.Content>
      </Card>
    ))}
  </div>
);

export const CustomHeight = {
  args: {
    children: (
      <>
        <Card.Image height={200} />
        <Card.Content>
          <Card.Title>Custom Image Height</Card.Title>
          <Card.Description>
            The image height can be customized using the height prop.
          </Card.Description>
        </Card.Content>
      </>
    ),
  },
};
