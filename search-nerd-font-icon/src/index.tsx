import { useState } from "react";
import { ActionPanel, Action, Grid, Color } from "@raycast/api";
import { glyphs } from "./glyphs";

export default function Command() {
  const [itemSize, setItemSize] = useState<Grid.ItemSize>(Grid.ItemSize.Medium);
  const [isLoading, setIsLoading] = useState(true);
  return (
    <Grid
      itemSize={itemSize}
      inset={Grid.Inset.Large}
      isLoading={isLoading}
      searchBarAccessory={
        <Grid.Dropdown
          tooltip="Grid Item Size"
          storeValue
          onChange={(newValue) => {
            setItemSize(newValue as Grid.ItemSize);
            setIsLoading(false);
          }}
        >
          <Grid.Dropdown.Item title="Large" value={Grid.ItemSize.Large} />
          <Grid.Dropdown.Item title="Medium" value={Grid.ItemSize.Medium} />
          <Grid.Dropdown.Item title="Small" value={Grid.ItemSize.Small} />
        </Grid.Dropdown>
      }
    >
      {!isLoading &&
        Object.entries(glyphs).map(([name, glyph]) => (
          <Grid.Item
            key={name}
            content={{
              value: { source: String.fromCharCode(parseInt(glyph, 16)), tintColor: Color.PrimaryText },
              tooltip: name,
            }}
            title={name}
            subtitle={glyph}
            actions={
              <ActionPanel>
                <Action.CopyToClipboard content={glyph} />
              </ActionPanel>
            }
          />
        ))}
    </Grid>
  );
}
