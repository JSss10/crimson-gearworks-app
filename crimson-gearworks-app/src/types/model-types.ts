// Model Related Types


export interface PartSetType {
    setName: string;
}


export interface ModelPartType {
    id: string;
    name: string;
}


export interface ModelAttachmentPointType {
    name: string;
    position: [number, number, number];
    rotation?: [number, number, number];
}


export type PartSetID = typeof partSetRegistry[number]["setName"];
export type PartRegistryType = { [key in PartSetID]: ModelPart[];};



export const partTypeRegistry = [
        { id: "head", name: "Head" },
        { id: "torso", name: "Torso" },
        { id: "waist", name: "Waist" },
        { id: "backpack", name: "Backpack" },
        { id: "arm-upper-left", name: "Upper Left Arm" },
        { id: "arm-upper-right", name: "Upper Right Arm" },
        { id: "arm-hand-left", name: "Left Hand"},
        { id: "arm-hand-right", name: "Right Hand" },
        { id: "leg-upper-left", name: "Upper Left Leg" },
        { id: "leg-upper-right", name: "Upper Right Leg" },
        { id: "leg-lower-left", name: "Lower Left Leg" },
        { id: "leg-lower-right", name: "Lower Right Leg" },
        { id: "foot-left", name: "Left Foot" },
        { id: "foot-right", name: "Right Foot" }
] as const;


export const partSetRegistry = [
    { setName: "Nephilim" }
] as const;


export type PartTypeID = typeof partTypeRegistry[number]["id"];


export interface ModelPart {
    id: string;

    // Display name for the part
    name: string;

    // URL to the 3D model file
    modelUrl: string;

    // Type of part (head, torso, etc.)
    partType: PartTypeID;

    // Color, Texture or Sticker customization options
    customizationOptions?: CustomizationOption[];

    // Attachment points for the part
    requiredAttachmentPoints?: string[];

    // Overrides for attachment points
    attachmentPointOverrides?: ModelAttachmentPointType[];
    
    isVisible?: boolean;
    isSelected?: boolean;
    isLocked?: boolean;
}


// Model Customization


export const customizationTypes = [
    { id: "color", name: "Color" },
    { id: "texture", name: "Texture" },
    { id: "sticker", name: "Sticker" }
] as const;

export interface CustomizationOption {
    id: string;

    // Display name for the option
    name: string;

    // URL to the material or image asset
    url: string;

    // Icon to display in the UI
    icon: React.ReactNode;

    // Material, Image, or Sticker type
    customizationType: typeof customizationTypes[number]["id"];

    // Default option that displays when no customization is selected
    isDefaultOption?: boolean;

    // Placeholder for ui-icon color
    color?: string;
}