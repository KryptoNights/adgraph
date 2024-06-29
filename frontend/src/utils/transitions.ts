import { useWriteContract } from "wagmi";
import { Contract, ethers, JsonRpcProvider } from "ethers";

export const ABI = [
  {
    inputs: [
      {
        internalType: "address",
        name: "profile",
        type: "address",
      },
      {
        internalType: "string",
        name: "app",
        type: "string",
      },
    ],
    name: "block_app",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "profile",
        type: "address",
      },
      {
        internalType: "string",
        name: "tag",
        type: "string",
      },
    ],
    name: "block_tag",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "profile",
        type: "address",
      },
    ],
    name: "get_apps",
    outputs: [
      {
        internalType: "string[]",
        name: "",
        type: "string[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "profile",
        type: "address",
      },
      {
        internalType: "string",
        name: "app",
        type: "string",
      },
    ],
    name: "get_tags",
    outputs: [
      {
        internalType: "string[]",
        name: "",
        type: "string[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "profile",
        type: "address",
      },
      {
        internalType: "string",
        name: "app",
        type: "string",
      },
    ],
    name: "remove_app_from_profile",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "profile",
        type: "address",
      },
      {
        internalType: "string",
        name: "app",
        type: "string",
      },
      {
        internalType: "string",
        name: "tag",
        type: "string",
      },
    ],
    name: "remove_tag_from_profile",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "profile",
        type: "address",
      },
    ],
    name: "get_blocked_apps_and_tags",
    outputs: [
      {
        internalType: "string[]",
        name: "",
        type: "string[]",
      },
      {
        internalType: "string[]",
        name: "",
        type: "string[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
export const CONTRACT = "0xfa80Be5293e080B34E551ca7edB4d795F9B647e1";

// const { writeContract } = useWriteContract();

const baseProvider = new JsonRpcProvider(
  "https://base-sepolia.g.alchemy.com/v2/iuu-FM9fYkPCrqX6OQtAy1GRpxRZHsuR"
);

export const get_profile = async (profile: string) => {
  const adgraph = new Contract(CONTRACT, ABI, baseProvider);

  console.log("get_profile", profile, typeof profile);
  const apps = (await adgraph?.get_apps(profile)) as string[];

  const map = new Map<string, string[]>();
  for (const app of apps) {
    const tags = (await adgraph?.get_tags(profile, app)) as string[];
    map.set(
      app,
      tags.filter((tag) => tag !== "")
    );
  }
  return map;
};

export const get_blocked_apps_and_tags = async (profile: string) => {
  const adgraph = new Contract(CONTRACT, ABI, baseProvider);

  const [blocked_apps, blocked_tags] =
    (await adgraph?.get_blocked_apps_and_tags(profile)) as string[][];

  return {
    blocked_apps,
    blocked_tags,
  };
};

// export async function block_app(profile: string, app: string) {
//   return writeContract({
//     abi: ABI,
//     address: CONTRACT,
//     functionName: "block_app",
//     args: [profile, app],
//   });
// }

// export async function block_tag(profile: string, tag: string) {
//   return writeContract({
//     abi: ABI,
//     address: CONTRACT,
//     functionName: "block_tag",
//     args: [profile, tag],
//   });
// }

// export async function remove_app_from_profile(profile: string, app: string) {
//   return writeContract({
//     abi: ABI,
//     address: CONTRACT,
//     functionName: "remove_app_from_profile",
//     args: [profile, app],
//   });
// }

// export async function remove_tag_from_profile(
//   profile: string,
//   app: string,
//   tag: string
// ) {
//   return writeContract({
//     abi: ABI,
//     address: CONTRACT,
//     functionName: "remove_tag_from_profile",
//     args: [profile, app, tag],
//   });
// }

import axios from "axios";

interface TagAdded {
  profile: string;
  app: string;
  id: string;
  tag: string;
}

interface Variables {
  tag_in: string[];
}

async function fetchTagAddeds(tags: Variables): Promise<TagAdded[]> {
  // convert string[] to [a, b, c] format
  const tag_string = JSON.stringify(tags.tag_in);
  const query = `
    query MyQuery {
      tagAddeds(where: {tag_in: ${tag_string}}) {
        profile
        app
        id
        tag
      }
    }
  `;
  console.log(query);
  try {
    const response = await axios.post(
      "https://api.studio.thegraph.com/query/80137/adgraph/v0.0.4",
      {
        query,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.data.errors) {
      throw new Error(JSON.stringify(response.data.errors));
    }

    // console.log(response.data);
    return response.data.data.tagAddeds;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Re-throw for further handling
  }
}

// image in base64 encoded string
async function ai_tagger(image: string): Promise<string[]> {
  const response = await axios.post(
    "https://us-central1-my-project-5269-1684667148053.cloudfunctions.net/adgraph-ai",
    {
      base64_image: image,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  console.log(response.data);
  const tags = [];
  for (const tag of response.data) {
    // lowercase and trimmed
    tags.push(tag.toLowerCase().trim());
  }
  return tags;
}

export async function get_wallets_and_tags_for_image(
  image: string
): Promise<any> {
  const tags = await ai_tagger(image);
  console.log("tags");
  console.log(typeof tags);
  const tagAddeds = await fetchTagAddeds({ tag_in: tags });
  // console.log("tagAddeds");
  // console.log(tagAddeds);

  const profile_tag_map = new Map<string, string[]>();
  for (const tagAdded of tagAddeds) {
    if (!profile_tag_map.has(tagAdded.profile)) {
      profile_tag_map.set(tagAdded.profile, [tagAdded.tag]);
    } else {
      profile_tag_map.get(tagAdded.profile)?.push(tagAdded.tag);
    }
  }

  return {
    tags,
    profile_tag_map,
  };
}
