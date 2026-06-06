export default function AboutUs() {
  // History (est. 2013), team bios, board, advisors.
  return (
    <article className="page page--about">
      <h1>About Us</h1>
      <section>
        <h2>Our Story</h2>
        <p>{/* TODO: founding story (2013, UMich) */}</p>
      </section>
      <section>
        <h2>Leadership</h2>
        {/* TODO: <TeamGrid members={LEADERSHIP} /> */}
      </section>
      <section>
        <h2>Board & Advisors</h2>
        {/* TODO: <TeamGrid members={ADVISORS} /> */}
      </section>
    </article>
  );
}
