import { GoldenGrid, GoldenBox } from "@gifcommit/golden-grids";
import type { PlacementValue } from "@gifcommit/golden-grids";
import { useViewport, pick } from "../lib/viewport";
import { Fact } from "../lib/boxes";
import { SERVICE } from "../content";
import { Band } from "./Band";

/**
 * The modules that break the rows up, as the reference breaks its own: a
 * plan banner between the two halves of the ranking, the reasons to join
 * before the opened title, the price table and the FAQ between the acts,
 * and the call to action last. The service is fictional; the copy is the
 * study's. There is no form and no sign-up anywhere.
 */
export function PlanBannerBand() {
  const viewport = useViewport();
  const single = viewport === "mobile";
  return (
    <Band id="plan-banner" title={SERVICE.banner.headline} lesson={SERVICE.banner.body} note={`from=1 to=${single ? 1 : 2} · placement="right" · the strip`} cap={single ? undefined : "60rem"}>
      <GoldenGrid from={1} to={single ? 1 : 2} placement="right">
        <GoldenBox>
          <Fact label="The plan with ads" fitClass="fit--num" body={<p>{SERVICE.banner.body}</p>} link={{ href: "#plans", label: SERVICE.banner.cta, aria: "See the plans, below" }}>
            {"$5.99\na month"}
          </Fact>
        </GoldenBox>
        <GoldenBox>
          <Fact label={SERVICE.name} fitClass="fit--light">{"Every film\nin the library,\nin HD"}</Fact>
        </GoldenBox>
      </GoldenGrid>
    </Band>
  );
}

export function ReasonsBand() {
  const viewport = useViewport();
  const [to, placement] = pick<readonly [number, PlacementValue]>(viewport, { mobile: [3, "bottom"], tablet: [4, "left"], desktop: [4, "left"] });
  return (
    <Band id="reasons" title="More reasons to join" lesson="What a membership includes, on every plan." note={`from=1 to=${to} · placement="${placement}" · clockwise=true · hero ${to === 4 ? "right" : "left"}`}>
      <GoldenGrid from={1} to={to} placement={placement}>
        {SERVICE.reasons.map((r) => (
          <GoldenBox key={r.title}>
            <Fact label={SERVICE.name} body={<p>{r.body}</p>}>{r.title}</Fact>
          </GoldenBox>
        ))}
      </GoldenGrid>
    </Band>
  );
}

export function PlansBand() {
  const viewport = useViewport();
  return (
    <Band id="plans" title="A plan to suit your needs" lesson="Three plans. The Standard plan is the one most members choose: two screens, downloads, and no ads." note='from=1 to=3 · placement="bottom" · clockwise=true · hero left: the plan most chosen' cap={viewport === "desktop" ? "60rem" : undefined}>
      <GoldenGrid from={1} to={3} placement="bottom">
        {SERVICE.plans.map((p) => (
          <GoldenBox key={p.name}>
            <Fact label={`${p.name} · ${p.quality}`} fitClass="fit--num" body={<ul className="points">{p.points.map((pt) => <li key={pt}>{pt}</li>)}</ul>} source={p.note}>
              {`${p.price}\n${p.per}`}
            </Fact>
          </GoldenBox>
        ))}
      </GoldenGrid>
    </Band>
  );
}

/** The FAQ is a list. Six questions of equal standing are not a hierarchy,
 *  so they are not a grid; each opens in place. */
export function FaqBand() {
  return (
    <section className="band" id="faq" aria-labelledby="faq-title">
      <header className="band__header">
        <h2 id="faq-title" className="band__title">Frequently asked questions</h2>
      </header>
      <div className="faq">
        {SERVICE.faq.map(([q, a]) => (
          <details key={q} className="faq__item">
            <summary>{q}</summary>
            <p>{a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

/** The reference closes on an email box that begins a membership. GIFflix has
 *  no accounts, so the same square holds a plain statement of that, with no
 *  input and no button (CLAUDE.md, Safe Browsing remediation). */
export function CtaBand() {
  const viewport = useViewport();
  const single = viewport === "mobile";
  return (
    <Band id="cta" title={SERVICE.cta.headline} lesson={SERVICE.cta.body} note={`from=1 to=${single ? 1 : 2} · placement="left"`} cap={single ? undefined : "60rem"}>
      <GoldenGrid from={1} to={single ? 1 : 2} placement="left">
        <GoldenBox>
          <Fact label={SERVICE.name} body={<p>{SERVICE.cta.detail}</p>}>{SERVICE.cta.line}</Fact>
        </GoldenBox>
        <GoldenBox>
          <Fact label={SERVICE.cta.span.label} fitClass="fit--num">{SERVICE.cta.span.line}</Fact>
        </GoldenBox>
      </GoldenGrid>
    </Band>
  );
}
