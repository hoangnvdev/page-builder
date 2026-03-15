export const comicSplashConfig = {
  id: "comic-splash",
  name: "Comic Splash",
  description: "Playful comic-book style with bold colors and fun vibes",
  icon: "💥",

  layout: [
    "hero",
    "marquee",
    "comicPanels",
    "features",
    "stats",
    "testimonials",
    "imageGrid",
    "cta",
    "footer",
  ],

  configSchema: {
    page: {
      fontFamily: {
        type: "select",
        label: "Font Family",
        options: [
          {
            value: '"Comic Sans MS", "Chalkboard SE", cursive',
            label: "Comic",
          },
          { value: '"Bangers", cursive', label: "Bangers" },
          { value: '"Fredoka One", cursive', label: "Fredoka" },
          { value: "system-ui, sans-serif", label: "System" },
        ],
      },
      backgroundColor: { type: "color", label: "Page Background" },
      textColor: { type: "color", label: "Page Text Color" },
    },
    elements: {
      hero: {
        // Section-level properties
        backgroundColor: { type: "color", label: "Background Color" },
        padding: {
          type: "select",
          label: "Padding",
          options: [
            { value: "40px 20px", label: "Small" },
            { value: "80px 20px", label: "Medium" },
            { value: "120px 20px", label: "Large" },
          ],
        },
        maxWidth: {
          type: "select",
          label: "Max Width",
          options: [
            { value: "600px", label: "Small" },
            { value: "800px", label: "Medium" },
            { value: "1000px", label: "Large" },
            { value: "100%", label: "Full" },
          ],
        },
        align: {
          type: "select",
          label: "Alignment",
          options: [
            { value: "left", label: "Left" },
            { value: "center", label: "Center" },
            { value: "right", label: "Right" },
          ],
        },
        // Nested title properties
        title: {
          text: { type: "text", label: "Title" },
          color: { type: "color", label: "Title Color" },
          size: {
            type: "select",
            label: "Title Size",
            options: [
              { value: "2rem", label: "Small" },
              { value: "3rem", label: "Medium" },
              { value: "4rem", label: "Large" },
            ],
          },
        },
        // Nested subtitle properties
        subtitle: {
          text: { type: "textarea", label: "Subtitle" },
          color: { type: "color", label: "Subtitle Color" },
          size: {
            type: "select",
            label: "Subtitle Size",
            options: [
              { value: "0.875rem", label: "Small" },
              { value: "1rem", label: "Medium" },
              { value: "1.25rem", label: "Large" },
            ],
          },
        },
        // Nested button properties
        button: {
          text: { type: "text", label: "Button Text" },
          color: { type: "color", label: "Button Background Color" },
          textColor: { type: "color", label: "Button Text Color" },
          size: {
            type: "select",
            label: "Button Size",
            options: [
              { value: "small", label: "Small" },
              { value: "medium", label: "Medium" },
              { value: "large", label: "Large" },
            ],
          },
        },
      },
      marquee: {
        text: { type: "text", label: "Marquee Text" },
        backgroundColor: { type: "color", label: "Background Color" },
        textColor: { type: "color", label: "Text Color" },
        padding: {
          type: "select",
          label: "Padding",
          options: [
            { value: "10px 20px", label: "Small" },
            { value: "20px 20px", label: "Medium" },
            { value: "30px 20px", label: "Large" },
          ],
        },
        speed: {
          type: "select",
          label: "Animation Speed",
          options: [
            { value: "slow", label: "Slow" },
            { value: "medium", label: "Medium" },
            { value: "fast", label: "Fast" },
          ],
        },
      },
      comicPanels: {
        // Section-level properties
        backgroundColor: { type: "color", label: "Background Color" },
        padding: {
          type: "select",
          label: "Padding",
          options: [
            { value: "40px 20px", label: "Small" },
            { value: "80px 20px", label: "Medium" },
            { value: "120px 20px", label: "Large" },
          ],
        },
        maxWidth: {
          type: "select",
          label: "Max Width",
          options: [
            { value: "800px", label: "Medium" },
            { value: "1000px", label: "Large" },
            { value: "1200px", label: "Extra Large" },
            { value: "100%", label: "Full" },
          ],
        },
        align: {
          type: "select",
          label: "Alignment",
          options: [
            { value: "left", label: "Left" },
            { value: "center", label: "Center" },
            { value: "right", label: "Right" },
          ],
        },
        columns: {
          type: "slider",
          label: "Columns",
          min: 1,
          max: 6,
          step: 1,
        },
        gap: {
          type: "select",
          label: "Gap Between Cards",
          options: [
            { value: "10px", label: "Small" },
            { value: "20px", label: "Medium" },
            { value: "30px", label: "Large" },
          ],
        },
        // Nested heading properties
        heading: {
          text: { type: "text", label: "Heading" },
          size: {
            type: "select",
            label: "Heading Size",
            options: [
              { value: "1.5rem", label: "Small" },
              { value: "2rem", label: "Medium" },
              { value: "2.5rem", label: "Large" },
            ],
          },
          weight: {
            type: "select",
            label: "Heading Weight",
            options: [
              { value: "300", label: "Light" },
              { value: "400", label: "Normal" },
              { value: "700", label: "Bold" },
            ],
          },
          color: { type: "color", label: "Heading Color" },
        },
        // Card-level properties (applied to all cards)
        card: {
          backgroundColor: { type: "color", label: "Background Color" },
          padding: {
            type: "select",
            label: "Padding",
            options: [
              { value: "10px", label: "Small" },
              { value: "20px", label: "Medium" },
              { value: "30px", label: "Large" },
            ],
          },
          align: {
            type: "select",
            label: "Text Alignment",
            options: [
              { value: "left", label: "Left" },
              { value: "center", label: "Center" },
              { value: "right", label: "Right" },
            ],
          },
          borderRadius: {
            type: "select",
            label: "Border Radius",
            options: [
              { value: "0px", label: "None" },
              { value: "8px", label: "Less Rounded" },
              { value: "12px", label: "Rounded" },
              { value: "20px", label: "More Rounded" },
            ],
          },
          dropShadow: {
            type: "select",
            label: "Drop Shadow",
            options: [
              { value: "none", label: "None" },
              { value: "0 2px 4px rgba(0,0,0,0.1)", label: "Light Shadow" },
              { value: "0 4px 8px rgba(0,0,0,0.15)", label: "Shadow" },
              { value: "0 8px 16px rgba(0,0,0,0.2)", label: "More Shadow" },
            ],
          },
          // Nested title properties for cards
          title: {
            text: { type: "text", label: "Title" },
            size: {
              type: "select",
              label: "Title Size",
              options: [
                { value: "1rem", label: "Small" },
                { value: "1.25rem", label: "Medium" },
                { value: "1.5rem", label: "Large" },
              ],
            },
            weight: {
              type: "select",
              label: "Title Weight",
              options: [
                { value: "300", label: "Light" },
                { value: "400", label: "Normal" },
                { value: "700", label: "Bold" },
              ],
            },
            color: { type: "color", label: "Title Color" },
          },
          // Nested content properties for cards
          content: {
            text: { type: "textarea", label: "Content" },
            size: {
              type: "select",
              label: "Text Size",
              options: [
                { value: "0.875rem", label: "Small" },
                { value: "1rem", label: "Medium" },
                { value: "1.125rem", label: "Large" },
              ],
            },
            weight: {
              type: "select",
              label: "Text Weight",
              options: [
                { value: "300", label: "Light" },
                { value: "400", label: "Normal" },
                { value: "700", label: "Bold" },
              ],
            },
            color: { type: "color", label: "Text Color" },
          },
        },
        panels: { type: "array", label: "Comic Panels" },
      },
      features: {
        // Section-level properties
        backgroundColor: { type: "color", label: "Background Color" },
        padding: {
          type: "select",
          label: "Padding",
          options: [
            { value: "40px 20px", label: "Small" },
            { value: "80px 20px", label: "Medium" },
            { value: "120px 20px", label: "Large" },
          ],
        },
        maxWidth: {
          type: "select",
          label: "Max Width",
          options: [
            { value: "800px", label: "Medium" },
            { value: "1000px", label: "Large" },
            { value: "1200px", label: "Extra Large" },
            { value: "100%", label: "Full" },
          ],
        },
        align: {
          type: "select",
          label: "Alignment",
          options: [
            { value: "left", label: "Left" },
            { value: "center", label: "Center" },
            { value: "right", label: "Right" },
          ],
        },
        columns: {
          type: "slider",
          label: "Columns",
          min: 1,
          max: 6,
          step: 1,
        },
        gap: {
          type: "select",
          label: "Gap Between Cards",
          options: [
            { value: "20px", label: "Small" },
            { value: "30px", label: "Medium" },
            { value: "40px", label: "Large" },
          ],
        },
        // Nested heading properties
        heading: {
          text: { type: "text", label: "Heading" },
          size: {
            type: "select",
            label: "Heading Size",
            options: [
              { value: "1.5rem", label: "Small" },
              { value: "2rem", label: "Medium" },
              { value: "2.5rem", label: "Large" },
            ],
          },
          weight: {
            type: "select",
            label: "Heading Weight",
            options: [
              { value: "300", label: "Light" },
              { value: "400", label: "Normal" },
              { value: "700", label: "Bold" },
            ],
          },
          color: { type: "color", label: "Heading Color" },
        },
        // Card-level properties (applied to all cards)
        card: {
          backgroundColor: { type: "color", label: "Background Color" },
          padding: {
            type: "select",
            label: "Padding",
            options: [
              { value: "10px", label: "Small" },
              { value: "20px", label: "Medium" },
              { value: "30px", label: "Large" },
            ],
          },
          align: {
            type: "select",
            label: "Text Alignment",
            options: [
              { value: "left", label: "Left" },
              { value: "center", label: "Center" },
              { value: "right", label: "Right" },
            ],
          },
          borderRadius: {
            type: "select",
            label: "Border Radius",
            options: [
              { value: "0px", label: "None" },
              { value: "8px", label: "Less Rounded" },
              { value: "12px", label: "Rounded" },
              { value: "20px", label: "More Rounded" },
            ],
          },
          dropShadow: {
            type: "select",
            label: "Drop Shadow",
            options: [
              { value: "none", label: "None" },
              { value: "0 2px 4px rgba(0,0,0,0.1)", label: "Light Shadow" },
              { value: "0 4px 8px rgba(0,0,0,0.15)", label: "Shadow" },
              { value: "0 8px 16px rgba(0,0,0,0.2)", label: "More Shadow" },
            ],
          },
          // Nested title properties for cards
          title: {
            text: { type: "text", label: "Title" },
            size: {
              type: "select",
              label: "Title Size",
              options: [
                { value: "1rem", label: "Small" },
                { value: "1.25rem", label: "Medium" },
                { value: "1.5rem", label: "Large" },
              ],
            },
            weight: {
              type: "select",
              label: "Title Weight",
              options: [
                { value: "300", label: "Light" },
                { value: "400", label: "Normal" },
                { value: "700", label: "Bold" },
              ],
            },
            color: { type: "color", label: "Title Color" },
          },
          // Nested content properties for cards
          content: {
            text: { type: "textarea", label: "Content" },
            size: {
              type: "select",
              label: "Text Size",
              options: [
                { value: "0.875rem", label: "Small" },
                { value: "1rem", label: "Medium" },
                { value: "1.125rem", label: "Large" },
              ],
            },
            weight: {
              type: "select",
              label: "Text Weight",
              options: [
                { value: "300", label: "Light" },
                { value: "400", label: "Normal" },
                { value: "700", label: "Bold" },
              ],
            },
            color: { type: "color", label: "Text Color" },
          },
        },
        items: { type: "array", label: "Features" },
      },
      stats: {
        title: {
          text: { type: "text", label: "Title" },
          size: {
            type: "select",
            label: "Title Size",
            options: [
              { value: "1.5rem", label: "Small" },
              { value: "2rem", label: "Medium" },
              { value: "2.5rem", label: "Large" },
            ],
          },
          weight: {
            type: "select",
            label: "Title Weight",
            options: [
              { value: "300", label: "Light" },
              { value: "400", label: "Normal" },
              { value: "700", label: "Bold" },
            ],
          },
          color: { type: "color", label: "Title Color" },
        },
        backgroundColor: { type: "color", label: "Background Color" },
        padding: {
          type: "select",
          label: "Padding",
          options: [
            { value: "40px 20px", label: "Small" },
            { value: "80px 20px", label: "Medium" },
            { value: "120px 20px", label: "Large" },
          ],
        },
        maxWidth: {
          type: "select",
          label: "Max Width",
          options: [
            { value: "800px", label: "Medium" },
            { value: "1000px", label: "Large" },
            { value: "1200px", label: "Extra Large" },
            { value: "100%", label: "Full" },
          ],
        },
        align: {
          type: "select",
          label: "Alignment",
          options: [
            { value: "left", label: "Left" },
            { value: "center", label: "Center" },
            { value: "right", label: "Right" },
          ],
        },
        columns: {
          type: "slider",
          label: "Columns",
          min: 1,
          max: 6,
          step: 1,
        },
        gap: {
          type: "select",
          label: "Gap Between Cards",
          options: [
            { value: "20px", label: "Small" },
            { value: "30px", label: "Medium" },
            { value: "40px", label: "Large" },
          ],
        },
        card: {
          backgroundColor: { type: "color", label: "Background Color" },
          padding: {
            type: "select",
            label: "Padding",
            options: [
              { value: "10px", label: "Small" },
              { value: "20px", label: "Medium" },
              { value: "30px", label: "Large" },
            ],
          },
          align: {
            type: "select",
            label: "Alignment",
            options: [
              { value: "left", label: "Left" },
              { value: "center", label: "Center" },
              { value: "right", label: "Right" },
            ],
          },
          borderRadius: {
            type: "select",
            label: "Border Radius",
            options: [
              { value: "0", label: "None" },
              { value: "8px", label: "Less Rounded" },
              { value: "12px", label: "Rounded" },
              { value: "20px", label: "More Rounded" },
            ],
          },
          dropShadow: {
            type: "select",
            label: "Drop Shadow",
            options: [
              { value: "none", label: "None" },
              { value: "0 2px 4px rgba(0,0,0,0.1)", label: "Light Shadow" },
              { value: "0 4px 8px rgba(0,0,0,0.15)", label: "Shadow" },
              { value: "0 8px 16px rgba(0,0,0,0.2)", label: "More Shadow" },
            ],
          },
          title: {
            text: { type: "text", label: "Title" },
            size: {
              type: "select",
              label: "Title Size",
              options: [
                { value: "1.5rem", label: "Small" },
                { value: "2rem", label: "Medium" },
                { value: "2.5rem", label: "Large" },
              ],
            },
            weight: {
              type: "select",
              label: "Title Weight",
              options: [
                { value: "300", label: "Light" },
                { value: "400", label: "Normal" },
                { value: "700", label: "Bold" },
              ],
            },
            color: { type: "color", label: "Title Color" },
          },
          content: {
            text: { type: "textarea", label: "Textarea" },
            size: {
              type: "select",
              label: "Text Size",
              options: [
                { value: "0.875rem", label: "Small" },
                { value: "1rem", label: "Medium" },
                { value: "1.125rem", label: "Large" },
              ],
            },
            weight: {
              type: "select",
              label: "Text Weight",
              options: [
                { value: "300", label: "Light" },
                { value: "400", label: "Normal" },
                { value: "700", label: "Bold" },
              ],
            },
            color: { type: "color", label: "Text Color" },
          },
        },
        items: { type: "array", label: "Stats" },
      },
      testimonials: {
        title: {
          text: { type: "text", label: "Title" },
          size: {
            type: "select",
            label: "Title Size",
            options: [
              { value: "1.5rem", label: "Small" },
              { value: "2rem", label: "Medium" },
              { value: "2.5rem", label: "Large" },
            ],
          },
          weight: {
            type: "select",
            label: "Title Weight",
            options: [
              { value: "300", label: "Light" },
              { value: "400", label: "Normal" },
              { value: "700", label: "Bold" },
            ],
          },
          color: { type: "color", label: "Title Color" },
        },
        backgroundColor: { type: "color", label: "Background Color" },
        padding: {
          type: "select",
          label: "Padding",
          options: [
            { value: "40px 20px", label: "Small" },
            { value: "80px 20px", label: "Medium" },
            { value: "120px 20px", label: "Large" },
          ],
        },
        maxWidth: {
          type: "select",
          label: "Max Width",
          options: [
            { value: "800px", label: "Medium" },
            { value: "1000px", label: "Large" },
            { value: "1200px", label: "Extra Large" },
            { value: "100%", label: "Full" },
          ],
        },
        align: {
          type: "select",
          label: "Alignment",
          options: [
            { value: "left", label: "Left" },
            { value: "center", label: "Center" },
            { value: "right", label: "Right" },
          ],
        },
        columns: {
          type: "slider",
          label: "Columns",
          min: 1,
          max: 4,
          step: 1,
        },
        gap: {
          type: "select",
          label: "Gap Between Cards",
          options: [
            { value: "15px", label: "Small" },
            { value: "20px", label: "Medium" },
            { value: "30px", label: "Large" },
          ],
        },
        card: {
          backgroundColor: { type: "color", label: "Background Color" },
          padding: {
            type: "select",
            label: "Padding",
            options: [
              { value: "15px", label: "Small" },
              { value: "25px", label: "Medium" },
              { value: "35px", label: "Large" },
            ],
          },
          align: {
            type: "select",
            label: "Alignment",
            options: [
              { value: "left", label: "Left" },
              { value: "center", label: "Center" },
              { value: "right", label: "Right" },
            ],
          },
          borderRadius: {
            type: "select",
            label: "Border Radius",
            options: [
              { value: "0", label: "None" },
              { value: "8px", label: "Less Rounded" },
              { value: "12px", label: "Rounded" },
              { value: "20px", label: "More Rounded" },
            ],
          },
          dropShadow: {
            type: "select",
            label: "Drop Shadow",
            options: [
              { value: "none", label: "None" },
              { value: "0 2px 4px rgba(0,0,0,0.1)", label: "Light Shadow" },
              { value: "0 4px 8px rgba(0,0,0,0.15)", label: "Shadow" },
              { value: "0 8px 16px rgba(0,0,0,0.2)", label: "More Shadow" },
            ],
          },
          avatar: {
            text: { type: "text", label: "Avatar" },
            size: {
              type: "select",
              label: "Size",
              options: [
                { value: "medium", label: "Medium" },
                { value: "large", label: "Large" },
                { value: "xlarge", label: "Extra Large" },
              ],
            },
            backgroundColor: { type: "color", label: "Background Color" },
          },
          title: {
            text: { type: "textarea", label: "Title" },
            size: {
              type: "select",
              label: "Title Size",
              options: [
                { value: "0.875rem", label: "Small" },
                { value: "1rem", label: "Medium" },
                { value: "1.125rem", label: "Large" },
              ],
            },
            weight: {
              type: "select",
              label: "Title Weight",
              options: [
                { value: "300", label: "Light" },
                { value: "400", label: "Normal" },
                { value: "700", label: "Bold" },
              ],
            },
            color: { type: "color", label: "Title Color" },
          },
          content: {
            text: { type: "text", label: "Textarea" },
            size: {
              type: "select",
              label: "Text Size",
              options: [
                { value: "0.75rem", label: "Small" },
                { value: "0.875rem", label: "Medium" },
                { value: "1rem", label: "Large" },
              ],
            },
            weight: {
              type: "select",
              label: "Text Weight",
              options: [
                { value: "300", label: "Light" },
                { value: "400", label: "Normal" },
                { value: "700", label: "Bold" },
              ],
            },
            color: { type: "color", label: "Text Color" },
          },
        },
        quotes: { type: "array", label: "Testimonials" },
      },
      imageGrid: {
        label: "Image Grid",
        heading: {
          text: { type: "text", label: "Heading" },
          size: {
            type: "select",
            label: "Heading Size",
            options: [
              { value: "1.5rem", label: "Small" },
              { value: "2rem", label: "Medium" },
              { value: "2.5rem", label: "Large" },
            ],
          },
          weight: {
            type: "select",
            label: "Heading Weight",
            options: [
              { value: "400", label: "Normal" },
              { value: "600", label: "Semi Bold" },
              { value: "700", label: "Bold" },
            ],
          },
          color: { type: "color", label: "Heading Color" },
        },
        backgroundColor: { type: "color", label: "Background Color" },
        padding: {
          type: "select",
          label: "Padding",
          options: [
            { value: "40px 20px", label: "Small" },
            { value: "80px 20px", label: "Medium" },
            { value: "120px 20px", label: "Large" },
          ],
        },
        maxWidth: {
          type: "select",
          label: "Max Width",
          options: [
            { value: "800px", label: "Medium" },
            { value: "1000px", label: "Large" },
            { value: "1200px", label: "Extra Large" },
            { value: "100%", label: "Full" },
          ],
        },
        align: {
          type: "select",
          label: "Alignment",
          options: [
            { value: "left", label: "Left" },
            { value: "center", label: "Center" },
            { value: "right", label: "Right" },
          ],
        },
        columns: {
          type: "slider",
          label: "Columns",
          min: 1,
          max: 6,
          step: 1,
        },
        gap: {
          type: "select",
          label: "Gap",
          options: [
            { value: "15px", label: "Small" },
            { value: "20px", label: "Medium" },
            { value: "30px", label: "Large" },
          ],
        },
        card: {
          backgroundColor: { type: "color", label: "Card Background Color" },
          padding: {
            type: "select",
            label: "Card Padding",
            options: [
              { value: "5px", label: "Small" },
              { value: "10px", label: "Medium" },
              { value: "15px", label: "Large" },
            ],
          },
          borderRadius: {
            type: "select",
            label: "Border Radius",
            options: [
              { value: "0px", label: "None" },
              { value: "8px", label: "Small" },
              { value: "12px", label: "Medium" },
              { value: "16px", label: "Large" },
            ],
          },
          dropShadow: {
            type: "select",
            label: "Drop Shadow",
            options: [
              { value: "none", label: "None" },
              { value: "light", label: "Light" },
              { value: "medium", label: "Medium" },
              { value: "heavy", label: "Heavy" },
            ],
          },
        },
        image: {
          url: { type: "text", label: "Image URL" },
          alt: { type: "text", label: "Alt Text" },
          fit: {
            type: "select",
            label: "Image Fit",
            options: [
              { value: "cover", label: "Cover" },
              { value: "contain", label: "Contain" },
              { value: "fill", label: "Fill" },
            ],
          },
          aspectRatio: {
            type: "select",
            label: "Aspect Ratio",
            options: [
              { value: "square", label: "Square (1:1)" },
              { value: "portrait", label: "Portrait (3:4)" },
              { value: "landscape", label: "Landscape (16:9)" },
            ],
          },
        },
        caption: {
          text: { type: "textarea", label: "Caption" },
          size: {
            type: "select",
            label: "Caption Size",
            options: [
              { value: "0.75rem", label: "Small" },
              { value: "0.875rem", label: "Medium" },
              { value: "1rem", label: "Large" },
            ],
          },
          weight: {
            type: "select",
            label: "Caption Weight",
            options: [
              { value: "400", label: "Normal" },
              { value: "500", label: "Medium" },
              { value: "600", label: "Semi Bold" },
            ],
          },
          color: { type: "color", label: "Caption Color" },
          textAlign: {
            type: "select",
            label: "Text Align",
            options: [
              { value: "left", label: "Left" },
              { value: "center", label: "Center" },
              { value: "right", label: "Right" },
            ],
          },
          backgroundColor: { type: "color", label: "Caption Background" },
        },
        images: { type: "array", label: "Images" },
      },
      cta: {
        label: "Call To Action",
        title: {
          text: { type: "text", label: "Title" },
          size: {
            type: "select",
            label: "Title Size",
            options: [
              { value: "2rem", label: "Small" },
              { value: "3rem", label: "Medium" },
              { value: "4rem", label: "Large" },
            ],
          },
          weight: {
            type: "select",
            label: "Title Weight",
            options: [
              { value: "400", label: "Normal" },
              { value: "500", label: "Medium" },
              { value: "700", label: "Bold" },
            ],
          },
          color: { type: "color", label: "Title Color" },
        },
        subtitle: {
          text: { type: "textarea", label: "Subtitle" },
          size: {
            type: "select",
            label: "Subtitle Size",
            options: [
              { value: "0.875rem", label: "Small" },
              { value: "1rem", label: "Medium" },
              { value: "1.25rem", label: "Large" },
            ],
          },
          color: { type: "color", label: "Subtitle Color" },
        },
        button: {
          text: { type: "text", label: "Button Text" },
          url: { type: "text", label: "Button URL" },
          color: { type: "color", label: "Button Background Color" },
          textColor: { type: "color", label: "Button Text Color" },
          size: {
            type: "select",
            label: "Button Size",
            options: [
              { value: "small", label: "Small" },
              { value: "medium", label: "Medium" },
              { value: "large", label: "Large" },
            ],
          },
        },
        backgroundColor: { type: "color", label: "Background Color" },
        padding: {
          type: "select",
          label: "Padding",
          options: [
            { value: "40px 20px", label: "Small" },
            { value: "80px 20px", label: "Medium" },
            { value: "120px 20px", label: "Large" },
          ],
        },
        maxWidth: {
          type: "select",
          label: "Max Width",
          options: [
            { value: "600px", label: "Small" },
            { value: "800px", label: "Medium" },
            { value: "1000px", label: "Large" },
            { value: "100%", label: "Full" },
          ],
        },
        align: {
          type: "select",
          label: "Alignment",
          options: [
            { value: "left", label: "Left" },
            { value: "center", label: "Center" },
            { value: "right", label: "Right" },
          ],
        },
      },
      footer: {
        label: "Footer",
        text: {
          text: { type: "text", label: "Text" },
          size: {
            type: "select",
            label: "Text Size",
            options: [
              { value: "0.75rem", label: "Small" },
              { value: "0.875rem", label: "Medium" },
              { value: "1rem", label: "Large" },
            ],
          },
          weight: {
            type: "select",
            label: "Text Weight",
            options: [
              { value: "400", label: "Normal" },
              { value: "500", label: "Medium" },
              { value: "700", label: "Bold" },
            ],
          },
          decoration: {
            type: "select",
            label: "Text Decoration",
            options: [
              { value: "none", label: "None" },
              { value: "underline", label: "Underline" },
              { value: "italic", label: "Italic" },
            ],
          },
          color: { type: "color", label: "Text Color" },
        },
        backgroundColor: { type: "color", label: "Background Color" },
        padding: {
          type: "select",
          label: "Padding",
          options: [
            { value: "20px", label: "Small" },
            { value: "40px", label: "Medium" },
            { value: "60px", label: "Large" },
          ],
        },
        align: {
          type: "select",
          label: "Alignment",
          options: [
            { value: "left", label: "Left" },
            { value: "center", label: "Center" },
            { value: "right", label: "Right" },
          ],
        },
      },
    },
  },

  defaultConfig: {
    page: {
      fontFamily: '"Comic Sans MS", "Chalkboard SE", cursive',
      backgroundColor: "#FFF5E1",
      textColor: "#2C1810",
    },
    elements: {
      hero: {
        backgroundColor: "#FF6B9D",
        padding: "80px 20px",
        maxWidth: "800px",
        align: "center",
        title: {
          text: "💥 BAM! Welcome to Our World! 💥",
          color: "#FFFFFF",
          size: "4rem",
        },
        subtitle: {
          text: "Get ready for an adventure that'll blow your socks off! We're here to make your dreams come true with a splash of fun and a whole lot of awesome!",
          color: "#FFF5E1",
          size: "1rem",
        },
        button: {
          text: "Let's Go! 🚀",
          color: "#FFD93D",
          textColor: "#2C1810",
          size: "large",
        },
      },
      marquee: {
        text: "🎨 POW! • 💥 BOOM! • ⭐ WHAM! • 🚀 ZOOM!",
        backgroundColor: "#FFD93D",
        textColor: "#2C1810",
        padding: "medium",
        speed: "medium",
      },
      comicPanels: {
        backgroundColor: "#FFF5E1",
        padding: "80px 20px",
        maxWidth: "1000px",
        align: "center",
        columns: 2,
        gap: "20px",
        heading: {
          text: "How It Works",
          size: "2rem",
          weight: "700",
          color: "#2C1810",
        },
        card: {
          backgroundColor: "#FF6B9D",
          padding: "20px",
          align: "center",
          borderRadius: "12px",
          dropShadow: "0 4px 8px rgba(0,0,0,0.15)",
          title: {
            size: "1.25rem",
            weight: "700",
            color: "#FFFFFF",
          },
          content: {
            size: "1rem",
            weight: "400",
            color: "#FFF5E1",
          },
        },
        panels: [
          {
            number: "1",
            backgroundColor: "#FF6B9D",
            padding: "20px",
            align: "center",
            borderRadius: "12px",
            dropShadow: "0 4px 8px rgba(0,0,0,0.15)",
            title: {
              text: "Sign Up",
              size: "1.25rem",
              weight: "700",
              color: "#FFFFFF",
            },
            content: {
              text: "Create your account faster than a speeding bullet!",
              size: "1rem",
              weight: "400",
              color: "#FFF5E1",
            },
          },
          {
            number: "2",
            backgroundColor: "#FFD93D",
            padding: "20px",
            align: "center",
            borderRadius: "12px",
            dropShadow: "0 4px 8px rgba(0,0,0,0.15)",
            title: {
              text: "Customize",
              size: "1.25rem",
              weight: "700",
              color: "#2C1810",
            },
            content: {
              text: "Make it yours with our super-powered tools!",
              size: "1rem",
              weight: "400",
              color: "#2C1810",
            },
          },
          {
            number: "3",
            backgroundColor: "#6BCB77",
            padding: "20px",
            align: "center",
            borderRadius: "12px",
            dropShadow: "0 4px 8px rgba(0,0,0,0.15)",
            title: {
              text: "Launch",
              size: "1.25rem",
              weight: "700",
              color: "#FFFFFF",
            },
            content: {
              text: "Blast off into awesomeness with one click!",
              size: "1rem",
              weight: "400",
              color: "#FFFFFF",
            },
          },
          {
            number: "4",
            backgroundColor: "#4D96FF",
            padding: "20px",
            align: "center",
            borderRadius: "12px",
            dropShadow: "0 4px 8px rgba(0,0,0,0.15)",
            title: {
              text: "Enjoy",
              size: "1.25rem",
              weight: "700",
              color: "#FFFFFF",
            },
            content: {
              text: "Sit back and watch the magic happen!",
              size: "1rem",
              weight: "400",
              color: "#FFFFFF",
            },
          },
        ],
      },
      features: {
        backgroundColor: "#6BCB77",
        padding: "80px 20px",
        maxWidth: "1000px",
        align: "center",
        columns: 3,
        gap: "30px",
        heading: {
          text: "Why Choose Us",
          size: "2rem",
          weight: "700",
          color: "#FFFFFF",
        },
        card: {
          backgroundColor: "transparent",
          padding: "20px",
          align: "center",
          borderRadius: "12px",
          dropShadow: "none",
          title: {
            size: "1.25rem",
            weight: "700",
            color: "#FFD93D",
          },
          content: {
            size: "1rem",
            weight: "400",
            color: "#FFFFFF",
          },
        },
        items: [
          {
            icon: "🎨",
            backgroundColor: "transparent",
            padding: "20px",
            align: "center",
            borderRadius: "12px",
            dropShadow: "none",
            title: {
              text: "Creative Blast",
              size: "1.25rem",
              weight: "700",
              color: "#FFD93D",
            },
            content: {
              text: "Unleash your creativity with our colorful tools!",
              size: "1rem",
              weight: "400",
              color: "#FFFFFF",
            },
          },
          {
            icon: "⚡",
            backgroundColor: "transparent",
            padding: "20px",
            align: "center",
            borderRadius: "12px",
            dropShadow: "none",
            title: {
              text: "Lightning Speed",
              size: "1.25rem",
              weight: "700",
              color: "#FFD93D",
            },
            content: {
              text: "Fast as a superhero, because ain't nobody got time!",
              size: "1rem",
              weight: "400",
              color: "#FFFFFF",
            },
          },
          {
            icon: "🎪",
            backgroundColor: "transparent",
            padding: "20px",
            align: "center",
            borderRadius: "12px",
            dropShadow: "none",
            title: {
              text: "Fun Factory",
              size: "1.25rem",
              weight: "700",
              color: "#FFD93D",
            },
            content: {
              text: "Work feels like play when you're with us!",
              size: "1rem",
              weight: "400",
              color: "#FFFFFF",
            },
          },
        ],
      },
      stats: {
        title: {
          text: "By The Numbers",
          size: "2.5rem",
          weight: "700",
          color: "#2C1810",
        },
        backgroundColor: "#FFD93D",
        padding: "120px 20px",
        maxWidth: "1200px",
        align: "center",
        columns: 4,
        gap: "40px",
        numberOfCards: 4,
        card: {
          backgroundColor: "transparent",
          padding: "20px",
          align: "center",
          borderRadius: "0",
          dropShadow: "none",
          title: {
            text: "",
            size: "2.5rem",
            weight: "700",
            color: "#FF6B9D",
          },
          content: {
            text: "",
            size: "1rem",
            weight: "400",
            color: "#2C1810",
          },
        },
        items: [
          {
            title: {
              text: "50K+",
              size: "2.5rem",
              weight: "700",
              color: "#FF6B9D",
            },
            content: {
              text: "Happy Users",
              size: "1rem",
              weight: "400",
              color: "#2C1810",
            },
          },
          {
            title: {
              text: "99.9%",
              size: "2.5rem",
              weight: "700",
              color: "#FF6B9D",
            },
            content: {
              text: "Uptime",
              size: "1rem",
              weight: "400",
              color: "#2C1810",
            },
          },
          {
            title: {
              text: "24/7",
              size: "2.5rem",
              weight: "700",
              color: "#FF6B9D",
            },
            content: {
              text: "Support",
              size: "1rem",
              weight: "400",
              color: "#2C1810",
            },
          },
          {
            title: {
              text: "100%",
              size: "2.5rem",
              weight: "700",
              color: "#FF6B9D",
            },
            content: {
              text: "Awesome",
              size: "1rem",
              weight: "400",
              color: "#2C1810",
            },
          },
        ],
      },
      testimonials: {
        title: {
          text: "What People Say",
          size: "2rem",
          weight: "700",
          color: "#2C1810",
        },
        backgroundColor: "#FFF5E1",
        padding: "120px 20px",
        maxWidth: "1200px",
        align: "center",
        columns: 3,
        gap: "20px",
        card: {
          backgroundColor: "#FFFFFF",
          padding: "25px",
          align: "center",
          borderRadius: "20px",
          dropShadow: "0 2px 4px rgba(0,0,0,0.1)",
          avatar: {
            text: "",
            size: "large",
            backgroundColor: "transparent",
          },
          title: {
            text: "",
            size: "1rem",
            weight: "400",
            color: "#2C1810",
          },
          content: {
            text: "",
            size: "0.875rem",
            weight: "700",
            color: "#FF6B9D",
          },
        },
        quotes: [
          {
            avatar: {
              text: "😍",
              size: "large",
              backgroundColor: "transparent",
            },
            title: {
              text: "This is absolutely AMAZING! My life changed overnight!",
              size: "1rem",
              weight: "400",
              color: "#2C1810",
            },
            content: {
              text: "Happy Customer",
              size: "0.875rem",
              weight: "700",
              color: "#FF6B9D",
            },
          },
          {
            avatar: {
              text: "🤩",
              size: "large",
              backgroundColor: "transparent",
            },
            title: {
              text: "I can't believe how fun and easy this is to use!",
              size: "1rem",
              weight: "400",
              color: "#2C1810",
            },
            content: {
              text: "Excited User",
              size: "0.875rem",
              weight: "700",
              color: "#FF6B9D",
            },
          },
          {
            avatar: {
              text: "🥳",
              size: "large",
              backgroundColor: "transparent",
            },
            title: {
              text: "Best decision I ever made! Highly recommend!",
              size: "1rem",
              weight: "400",
              color: "#2C1810",
            },
            content: {
              text: "Satisfied Client",
              size: "0.875rem",
              weight: "700",
              color: "#FF6B9D",
            },
          },
        ],
      },
      imageGrid: {
        heading: {
          text: "Gallery",
          size: "2.5rem",
          weight: "700",
          color: "#FFFFFF",
        },
        backgroundColor: "#4D96FF",
        padding: "80px 20px",
        maxWidth: "1000px",
        align: "center",
        columns: 3,
        gap: "20px",
        card: {
          backgroundColor: "#FFFFFF",
          padding: "10px",
          borderRadius: "8px",
          dropShadow: "light",
        },
        images: [
          {
            image: {
              url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400",
              alt: "Fun Design 1",
              fit: "cover",
              aspectRatio: "square",
            },
            caption: {
              text: "",
              size: "0.875rem",
              weight: "400",
              color: "#2C1810",
              textAlign: "center",
              backgroundColor: "transparent",
            },
          },
          {
            image: {
              url: "https://images.unsplash.com/photo-1618556450994-a6a128ef0d9d?w=400",
              alt: "Fun Design 2",
              fit: "cover",
              aspectRatio: "square",
            },
            caption: {
              text: "",
              size: "0.875rem",
              weight: "400",
              color: "#2C1810",
              textAlign: "center",
              backgroundColor: "transparent",
            },
          },
          {
            image: {
              url: "https://images.unsplash.com/photo-1618556450991-2f1af64e8191?w=400",
              alt: "Fun Design 3",
              fit: "cover",
              aspectRatio: "square",
            },
            caption: {
              text: "",
              size: "0.875rem",
              weight: "400",
              color: "#2C1810",
              textAlign: "center",
              backgroundColor: "transparent",
            },
          },
          {
            image: {
              url: "https://images.unsplash.com/photo-1618556450994-2f1af64e8191?w=400",
              alt: "Fun Design 4",
              fit: "cover",
              aspectRatio: "square",
            },
            caption: {
              text: "",
              size: "0.875rem",
              weight: "400",
              color: "#2C1810",
              textAlign: "center",
              backgroundColor: "transparent",
            },
          },
          {
            image: {
              url: "https://images.unsplash.com/photo-1618556450991-2f1af64e8191?w=400",
              alt: "Fun Design 5",
              fit: "cover",
              aspectRatio: "square",
            },
            caption: {
              text: "",
              size: "0.875rem",
              weight: "400",
              color: "#2C1810",
              textAlign: "center",
              backgroundColor: "transparent",
            },
          },
          {
            image: {
              url: "https://images.unsplash.com/photo-1618556450994-a6a128ef0d9d?w=400",
              alt: "Fun Design 6",
              fit: "cover",
              aspectRatio: "square",
            },
            caption: {
              text: "",
              size: "0.875rem",
              weight: "400",
              color: "#2C1810",
              textAlign: "center",
              backgroundColor: "transparent",
            },
          },
        ],
      },
      cta: {
        title: {
          text: "Ready to Join the Party? 🎉",
          size: "4rem",
          weight: "700",
          color: "#FFFFFF",
        },
        subtitle: {
          text: "Don't miss out on the fun! Click that button NOW!",
          size: "1.25rem",
          color: "#FFFFFF",
        },
        button: {
          text: "Count Me In! 🎊",
          url: "#",
          color: "#FFD93D",
          textColor: "#2C1810",
          size: "large",
        },
        backgroundColor: "#4D96FF",
        padding: "120px 20px",
        maxWidth: "800px",
        align: "center",
      },
      footer: {
        text: {
          text: "© 2026 Comic Splash Co. • Made with 💖 and lots of fun!",
          size: "0.875rem",
          weight: "400",
          decoration: "none",
          color: "#FFD93D",
        },
        backgroundColor: "#2C1810",
        padding: "40px",
        align: "center",
      },
    },
  },
};
