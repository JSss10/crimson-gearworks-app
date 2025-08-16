import GameShowcase, { GameShowcaseItem } from '@/components/features/game-showcase';
import stylesHG from '@/styles/features/hover-gallery.module.css';

export default function HoverGallery({
  items,
}: {
  items: GameShowcaseItem[];
}) {
  return (
    <section className={stylesHG.section}>
      <div className={stylesHG.gallery}>
        {items.map((item, idx) => (
          <GameShowcase key={`${item.src}-${idx}`} item={item} />
        ))}
      </div>
    </section>
  );
}