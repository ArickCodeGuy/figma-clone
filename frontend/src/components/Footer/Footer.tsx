import './styles.scss';

const FOOTER_LINKS = [
  {
    img: '/figma-clone/author.jpg',
    alt: 'Author',
    link: 'https://github.com/ArickCodeGuy',
  },
  {
    img: '/react-pokemons/github.png',
    alt: 'Github',
    link: 'https://github.com/ArickCodeGuy/figma-clone',
  },
] as { img: string; alt: string; link: string }[];

export function Footer() {
  return (
    <footer className="Footer banner">
      <div className="container">
        <div className="footer-links">
          {FOOTER_LINKS.map((i, k) => (
            <a href={i.link} target="_blank" className="footer-link" key={k}>
              <img className="footer-link__img" src={i.img} alt={i.alt} />
              <div>{i.alt}</div>
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
