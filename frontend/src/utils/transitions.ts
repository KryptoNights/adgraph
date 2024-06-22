import { useWriteContract, useReadContract } from "wagmi";

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
];
export const CONTRACT = "0x1966cc76d20c88EF2C30d12F61ca4509Cc1f228C";

// const { writeContract } = useWriteContract()

export async function get_profile(profile: string) {
  const apps_response = useReadContract({
    abi: ABI,
    address: CONTRACT,
    functionName: "get_apps",
    args: [profile],
  });

  if (!apps_response.error) {
    const apps = apps_response.data as string[];

    const map = new Map<string, string[]>();
    for (const app of apps) {
      const tags_response = useReadContract({
        abi: ABI,
        address: CONTRACT,
        functionName: "get_tags",
        args: [profile, app],
      });
      if (!tags_response.error) {
        map.set(app, tags_response.data as string[]);
      }
    }
    return map;
  } else {
    return null;
  }
}

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
  const query = `
    query MyQuery($tag_in: [String!]) {
      tagAddeds(where: {tag_in: $tag_in}) {
        profile
        app
        id
        tag
      }
    }
  `;

  try {
    const response = await axios.post(
      "https://api.studio.thegraph.com/query/80137/adgraph/v0.0.3",
      {
        query,
        tags,
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

    console.log(response.data);
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

  if (response.data.errors) {
    throw new Error(JSON.stringify(response.data.errors));
  }

  console.log(response.data);
  return response.data as string[];
}

export async function get_wallets_and_tags_for_image(
  image: string
): Promise<any> {
  const tags = await ai_tagger(image);
  const tagAddeds = await fetchTagAddeds({ tag_in: tags });

  const profile_tag_map = new Map<string, string>();
  for (const tagAdded of tagAddeds) {
    if (!profile_tag_map.has(tagAdded.profile)) {
      profile_tag_map.set(tagAdded.profile, tagAdded.tag);
    }
  }

  return {
    tags,
    profile_tag_map,
  };
}
