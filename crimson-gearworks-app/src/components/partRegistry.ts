import type { PartRegistryType } from "./types"

export const partRegistry: PartRegistryType = {
  Placeholder: [
    {
      id: "ph1-head",
      name: "PH1's Head",
      modelUrl: "/models/ph1.glb",
      partType: "head",
      isDefault: true,
      customizationOptions: [
        {
          id: "head-color-1",
          name: "Magnoile",
          url: "/Parts/Materials/magnoile-mat",
          icon: null,
          customizationType: "color",
          color: "#ff0000",
          isDefaultOption: true
        }
      ]
    }
  ],
  Nephilim: [
    {
      id: "neph-head",
      name: "Nephilim's Head",
      modelUrl: "/models/neph-head.glb",
      partType: "head",
      isDefault: false,
      customizationOptions: [
        {
          id: "head-color-1",
          name: "Slick Red",
          url: "/Parts/Materials/Neph-mat-red-head",
          icon: null, // Need to set this in component
          customizationType: "color",
          color: "#ff0000",
          isDefaultOption: true
        },
        {
          id: "head-color-2",
          name: "Blue Lagoon",
          url: "/Parts/Materials/Neph-mat-blue-head",
          icon: null,
          customizationType: "color",
          color: "#0000ff"
        },
        {
          id: "head-texture-1",
          name: "Smooth",
          url: "/Parts/Textures/Neph-tex-smooth-head",
          icon: null,
          customizationType: "texture",
          color: "#888888",
          isDefaultOption: true
        },
        {
          id: "head-texture-2",
          name: "Rough",
          url: "/Parts/Textures/Neph-tex-rough-head",
          icon: null,
          customizationType: "texture",
          color: "#666666"
        }
      ]
    },
    {
      id: "neph-torso",
      name: "Nephilim's Torso",
      modelUrl: "/models/neph-torso.glb",
      partType: "torso",
      isDefault: false,
      customizationOptions: [
        {
          id: "torso-color-1",
          name: "Sunset Orange",
          url: "/Parts/Materials/Neph-mat-orange-torso",
          icon: null,
          customizationType: "color",
          color: "#ff8800",
          isDefaultOption: true
        },
        {
          id: "torso-color-2",
          name: "Tribal Green",
          url: "/Parts/Materials/Neph-mat-green-torso",
          icon: null,
          customizationType: "color",
          color: "#00ff00"
        },
        {
          id: "torso-sticker-1",
          name: "Logo1",
          url: "/Parts/Stickers/Neph-logo-torso",
          icon: null,
          customizationType: "sticker",
          color: "#ffffffff"
        }
      ]
    },
    {
      id: "neph-waist",
      name: "Nephilim's Waist",
      modelUrl: "/models/neph-waist.glb",
      partType: "waist",
      isDefault: false,
      customizationOptions: [
        {
          id: "waist-color-1",
          name: "Blitz Purple",
          url: "/Parts/Materials/Neph-mat-purple-waist",
          icon: null,
          customizationType: "color",
          color: "#8800ff",
          isDefaultOption: true
        },
        {
          id: "waist-color-2",
          name: "Yellowjacket",
          url: "/Parts/Materials/Neph-mat-yellow-waist",
          icon: null,
          customizationType: "color",
          color: "#ffff00"
        }
      ]
    },
    {
      id: "neph-arm-upper-left",
      name: "Nephilim's Upper Left Arm",
      modelUrl: "/models/neph-arm-upper-left.glb",
      partType: "arm-upper-left",
      isDefault: false,
      customizationOptions: [
        {
          id: "arm-upper-left-color-1",
          name: "Night",
          url: "/Parts/Materials/Neph-mat-night-upper-left-arm",
          icon: null,
          customizationType: "color",
          color: "#383838ff",
          isDefaultOption: true
        },
        {
          id: "arm-upper-left-color-2",
          name: "Tribal Green",
          url: "/Parts/Materials/Neph-mat-green-upper-left-arm",
          icon: null,
          customizationType: "color",
          color: "#00ff00"
        }
      ]
    },
    {
      id: "neph-arm-upper-right",
      name: "Nephilim's Upper Right Arm",
      modelUrl: "/models/neph-arm-upper-right.glb",
      partType: "arm-upper-right",
      isDefault: false,
      customizationOptions: [
        {
          id: "arm-upper-right-color-1",
          name: "Night",
          url: "/Parts/Materials/Neph-mat-night-upper-right-arm",
          icon: null,
          customizationType: "color",
          color: "#383838ff",
          isDefaultOption: true
        },
        {
          id: "arm-upper-right-color-2",
          name: "Tribal Green",
          url: "/Parts/Materials/Neph-mat-green-upper-right-arm",
          icon: null,
          customizationType: "color",
          color: "#00ff00"
        },
        {
          id: "arm-upper-right-sticker-1",
          name: "Tribal Green",
          url: "/Parts/Materials/Neph-mat-green-upper-right-arm",
          icon: null,
          customizationType: "sticker",
          color: "#ffffffff"
        }
      ]
    },
    {
      id: "neph-arm-hand-right",
      name: "Nephilim's Right Hand",
      modelUrl: "/models/neph-arm-hand-right.glb",
      partType: "arm-hand-right",
      isDefault: false,
      customizationOptions: [
        {
          id: "arm-upper-right-color-1",
          name: "Night",
          url: "/Parts/Materials/Neph-mat-night-arm-hand-right",
          icon: null,
          customizationType: "color",
          color: "#383838ff",
          isDefaultOption: true
        },
        {
          id: "arm-upper-right-color-2",
          name: "Tribal Green",
          url: "/Parts/Materials/Neph-mat-green-arm-hand-right",
          icon: null,
          customizationType: "color",
          color: "#00ff00"
        },
        {
          id: "arm-upper-right-sticker-1",
          name: "Tribal Green",
          url: "/Parts/Materials/Neph-mat-green-arm-hand-right",
          icon: null,
          customizationType: "sticker",
          color: "#ffffffff"
        }
      ]
    },
    {
      id: "neph-arm-hand-left",
      name: "Nephilim's Left Hand",
      modelUrl: "/models/neph-arm-hand-left.glb",
      partType: "arm-hand-left",
      isDefault: false,
      customizationOptions: [
        {
          id: "arm-upper-right-color-1",
          name: "Night",
          url: "/Parts/Materials/Neph-mat-night-arm-hand-left",
          icon: null,
          customizationType: "color",
          color: "#383838ff",
          isDefaultOption: true
        },
        {
          id: "arm-upper-right-color-2",
          name: "Tribal Green",
          url: "/Parts/Materials/Neph-mat-green-arm-hand-left",
          icon: null,
          customizationType: "color",
          color: "#00ff00"
        },
        {
          id: "arm-upper-right-sticker-1",
          name: "Tribal Green",
          url: "/Parts/Materials/Neph-mat-green-arm-hand-left",
          icon: null,
          customizationType: "sticker",
          color: "#ffffffff"
        }
      ]
    }
  ],
  Cahrama: [
    {
      id: "cahrama-head",
      name: "Cahrama's Head",
      modelUrl: "/models/cahrama-head.glb",
      partType: "head",
      isDefault: false,
      customizationOptions: [
        {
          id: "head-color-1",
          name: "Slick Red",
          url: "/Parts/Materials/Cahrama-mat-red-head",
          icon: null, // Need to set this in component
          customizationType: "color",
          color: "#ff0000",
          isDefaultOption: true
        },
        {
          id: "head-color-2",
          name: "Blue Lagoon",
          url: "/Parts/Materials/Cahrama-mat-blue-head",
          icon: null,
          customizationType: "color",
          color: "#0000ff"
        },
        {
          id: "head-texture-1",
          name: "Smooth",
          url: "/Parts/Textures/Cahrama-tex-smooth-head",
          icon: null,
          customizationType: "texture",
          color: "#888888",
          isDefaultOption: true
        },
        {
          id: "head-texture-2",
          name: "Rough",
          url: "/Parts/Textures/Cahrama-tex-rough-head",
          icon: null,
          customizationType: "texture",
          color: "#666666"
        }
      ]
    },
    {
      id: "cahrama-torso",
      name: "Cahrama's Torso",
      modelUrl: "/models/cahrama-torso.glb",
      partType: "torso",
      isDefault: false,
      customizationOptions: [
        {
          id: "torso-color-1",
          name: "Sunset Orange",
          url: "/Parts/Materials/Cahrama-mat-orange-torso",
          icon: null,
          customizationType: "color",
          color: "#ff8800",
          isDefaultOption: true
        },
        {
          id: "torso-color-2",
          name: "Tribal Green",
          url: "/Parts/Materials/Cahrama-mat-green-torso",
          icon: null,
          customizationType: "color",
          color: "#00ff00"
        },
        {
          id: "torso-sticker-1",
          name: "Logo1",
          url: "/Parts/Stickers/Cahrama-logo-torso",
          icon: null,
          customizationType: "sticker",
          color: "#ffffffff"
        }
      ]
    },
    {
      id: "cahrama-waist",
      name: "Cahrama's Waist",
      modelUrl: "/models/cahrama-waist.glb",
      partType: "waist",
      isDefault: false,
      customizationOptions: [
        {
          id: "waist-color-1",
          name: "Blitz Purple",
          url: "/Parts/Materials/Cahrama-mat-purple-waist",
          icon: null,
          customizationType: "color",
          color: "#8800ff",
          isDefaultOption: true
        },
        {
          id: "waist-color-2",
          name: "Yellowjacket",
          url: "/Parts/Materials/Cahrama-mat-yellow-waist",
          icon: null,
          customizationType: "color",
          color: "#ffff00"
        }
      ]
    },
    {
      id: "cahrama-arm-upper-left",
      name: "Cahrama's Upper Left Arm",
      modelUrl: "/models/cahrama-arm-upper-left.glb",
      partType: "arm-upper-left",
      isDefault: false,
      customizationOptions: [
        {
          id: "arm-upper-left-color-1",
          name: "Night",
          url: "/Parts/Materials/Cahrama-mat-night-upper-left-arm",
          icon: null,
          customizationType: "color",
          color: "#383838ff",
          isDefaultOption: true
        },
        {
          id: "arm-upper-left-color-2",
          name: "Tribal Green",
          url: "/Parts/Materials/Cahrama-mat-green-upper-left-arm",
          icon: null,
          customizationType: "color",
          color: "#00ff00"
        }
      ]
    },
    {
      id: "cahrama-arm-upper-right",
      name: "Cahrama's Upper Right Arm",
      modelUrl: "/models/cahrama-arm-upper-right.glb",
      partType: "arm-upper-right",
      isDefault: false,
      customizationOptions: [
        {
          id: "arm-upper-right-color-1",
          name: "Night",
          url: "/Parts/Materials/Cahrama-mat-night-upper-right-arm",
          icon: null,
          customizationType: "color",
          color: "#383838ff",
          isDefaultOption: true
        },
        {
          id: "arm-upper-right-color-2",
          name: "Tribal Green",
          url: "/Parts/Materials/Cahrama-mat-green-upper-right-arm",
          icon: null,
          customizationType: "color",
          color: "#00ff00"
        },
        {
          id: "arm-upper-right-sticker-1",
          name: "Tribal Green",
          url: "/Parts/Materials/Cahrama-mat-green-upper-right-arm",
          icon: null,
          customizationType: "sticker",
          color: "#ffffffff"
        }
      ]
    },
    {
      id: "cahrama-arm-hand-right",
      name: "Cahrama's Right Hand",
      modelUrl: "/models/cahrama-arm-hand-right.glb",
      partType: "arm-hand-right",
      isDefault: false,
      customizationOptions: [
        {
          id: "arm-upper-right-color-1",
          name: "Night",
          url: "/Parts/Materials/Cahrama-mat-night-arm-hand-right",
          icon: null,
          customizationType: "color",
          color: "#383838ff",
          isDefaultOption: true
        },
        {
          id: "arm-upper-right-color-2",
          name: "Tribal Green",
          url: "/Parts/Materials/Cahrama-mat-green-arm-hand-right",
          icon: null,
          customizationType: "color",
          color: "#00ff00"
        },
        {
          id: "arm-upper-right-sticker-1",
          name: "Tribal Green",
          url: "/Parts/Materials/Cahrama-mat-green-arm-hand-right",
          icon: null,
          customizationType: "sticker",
          color: "#ffffffff"
        }
      ]
    },
    {
      id: "neph-arm-hand-left",
      name: "Nephilim's Left Hand",
      modelUrl: "/models/cahrama-arm-hand-left.glb",
      partType: "arm-hand-left",
      isDefault: false,
      customizationOptions: [
        {
          id: "arm-upper-right-color-1",
          name: "Night",
          url: "/Parts/Materials/Cahrama-mat-night-arm-hand-left",
          icon: null,
          customizationType: "color",
          color: "#383838ff",
          isDefaultOption: true
        },
        {
          id: "arm-upper-right-color-2",
          name: "Tribal Green",
          url: "/Parts/Materials/Cahrama-mat-green-arm-hand-left",
          icon: null,
          customizationType: "color",
          color: "#00ff00"
        },
        {
          id: "arm-upper-right-sticker-1",
          name: "Tribal Green",
          url: "/Parts/Materials/Cahrama-mat-green-arm-hand-left",
          icon: null,
          customizationType: "sticker",
          color: "#ffffffff"
        }
      ]
    }
  ],
  Photon: [

  ],
  Manus: [

  ],
  T9X: [

  ]
};