import { FaPalette, FaImage, FaStar } from 'react-icons/fa6';

export const TEST_colorOptions = [
    { id: 'red', name: 'Red', icon: <FaPalette size={16} />, color: '#8B2121' },
    { id: 'blue', name: 'Blue', icon: <FaPalette size={16} />, color: '#1E90FF' },
    { id: 'orange', name: 'Orange', icon: <FaPalette size={16} />, color: '#FF8C00' },
    { id: 'green', name: 'Green', icon: <FaPalette size={16} />, color: '#32CD32' },
    { id: 'purple', name: 'Purple', icon: <FaPalette size={16} />, color: '#9370DB' },
    { id: 'black', name: 'Black', icon: <FaPalette size={16} />, color: '#000000' },
    { id: 'white', name: 'White', icon: <FaPalette size={16} />, color: '#FFFFFF' },
];

export const TEST_textureOptions = [
    { id: 'smooth', name: 'Smooth', icon: <FaImage size={16} /> },
    { id: 'rough', name: 'Rough', icon: <FaImage size={16} /> },
    { id: 'metallic', name: 'Metallic', icon: <FaImage size={16} /> },
];

export const TEST_stickerOptions = [
    { id: 'none', name: 'None', icon: <FaStar size={16} /> },
    { id: 'logo', name: 'Logo', icon: <FaStar size={16} /> },
];