import { toPng } from 'html-to-image';

export const copyScreenshot = async (element: HTMLElement): Promise<void> => {
  try {
    const dataUrl = await toPng(element, {
      quality: 1.0,
      pixelRatio: 2,
      skipAutoScale: true,
      style: {
        transform: 'scale(1)'
      },
      filter: () => true
    });
    const response = await fetch(dataUrl);
    const blob = await response.blob();
    await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
  } catch (error) {
    console.error('Error copying screenshot:', error);
    throw error;
  }
};
