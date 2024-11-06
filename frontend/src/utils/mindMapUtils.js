import { colorName } from "../dummy/brainstorming";

export function CreateMindMapData(searchKeyword, SubKeywords) {
  const newNodes = SubKeywords.map((node, idx) => ({
    id: node,
    category: colorName[idx % colorName.length],
  }));

  const newLinks = SubKeywords.map((node) => ({
    source: searchKeyword,
    target: node,
  }));

  return {
    nodes: [
      {
        id: searchKeyword,
        category: "center",
      },
      ...newNodes,
    ],
    links: newLinks,
  };
}
