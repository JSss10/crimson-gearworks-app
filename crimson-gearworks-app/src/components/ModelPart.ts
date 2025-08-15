import type { PartRegistryType } from "./Types"

export const partRegistry: PartRegistryType = {
  Nephilim: [
    {
      id: "neph-head",
      name: "Nephilim Head",
      modelUrl: "/models/neph-head.glb",
      partType: "head",
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
      name: "Nephilim Torso",
      modelUrl: "/models/neph-torso.glb",
      partType: "torso",
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
          color: "#ffff00"
        }
      ]
    },
    {
      id: "neph-waist",
      name: "Nephilim Waist",
      modelUrl: "/models/neph-waist.glb",
      partType: "waist",
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
    }
  ]
};