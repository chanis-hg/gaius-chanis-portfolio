import { ArrowUpRight, ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa";

import Reveal from "../Reveal";
import SectionHeader from "../SectionHeader";
import { PROJECTS } from "../../data/index";
import ProjectVisual from "../ProjectVisual/ProjectVisual";

import styles from "./Projects.module.css";

function Block({ label, value, className }) {
  const isEmpty = !value || (Array.isArray(value) && value.length === 0);
  if (isEmpty) return null;

  return (
    <div className={className}>
      <h4 className={styles.label}>{label}</h4>

      {Array.isArray(value) ? (
        <ul className={styles.list}>
          {value.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ) : (
        <p>{value}</p>
      )}
    </div>
  );
}

export default function Projects({ t, lang, activeProjectId }) {
  const project =
    PROJECTS.find((item) => item.id === activeProjectId) || PROJECTS[0];

  if (!project) return null;

  const isFr = lang === "fr";
  const getText = (fr, en) => (isFr ? fr : en);

  const desc = getText(project.descFr, project.descEn);
  const role = getText(project.roleFr, project.roleEn);
  const caseStudy = project.caseStudy;
  const gallery = caseStudy?.gallery || [];

  const proof = getText(
    caseStudy?.proofFr || project.proofFr,
    caseStudy?.proofEn || project.proofEn,
  );

  const familyLabels = {
    development: getText("DÉVELOPPEMENT", "DEVELOPMENT"),
    design: "DESIGN",
    ux: getText("UX / CONCEPTION", "UX / DESIGN"),
  };

  const position = String(
    PROJECTS.findIndex((item) => item.id === project.id) + 1,
  ).padStart(2, "0");

  return (
    <section id="case-study" className={styles.section}>
      <div className="container">
        <Reveal>
          <SectionHeader
            tag={t.projects.sectionTag}
            title={getText("Comprendre le projet.", "Understand the project.")}
            sub={getText(
              "Au-delà du résultat, voici le problème, les choix et les contraintes.",
              "Beyond the result: the problem, decisions and constraints.",
            )}
          />
        </Reveal>

        <Reveal delay={0.08}>
          <article className={styles.caseStudy}>
            <div className={styles.content}>
              <header className={styles.header}>
                <div>
                  <span className={styles.family}>
                    {familyLabels[project.family] || project.family}
                  </span>

                  <h3 className={styles.title}>{project.title}</h3>

                  <p className={styles.category}>{project.category}</p>
                </div>

                <span
                  className={`${styles.status} ${
                    project.status === "finished"
                      ? styles.statusFinished
                      : styles.statusProgress
                  }`}
                >
                  {project.status === "finished"
                    ? getText("Terminé", "Completed")
                    : getText("En cours", "In progress")}
                </span>
              </header>

              <Block
                className={styles.description}
                label={getText("Contexte", "Context")}
                value={desc}
              />

              <Block
                className={styles.role}
                label={getText("Mon rôle", "My role")}
                value={role}
              />

              {caseStudy && (
                <>
                  <div className={styles.details}>
                    <Block
                      className={styles.detailBlock}
                      label={getText("Problème", "Problem")}
                      value={getText(
                        caseStudy.problemFr || caseStudy.contextFr,
                        caseStudy.problemEn || caseStudy.contextEn,
                      )}
                    />

                    <Block
                      className={styles.detailBlock}
                      label={getText("Contraintes", "Constraints")}
                      value={getText(
                        caseStudy.constraintsFr,
                        caseStudy.constraintsEn,
                      )}
                    />

                    <Block
                      className={styles.detailBlock}
                      label={getText("Décision clé", "Key decision")}
                      value={getText(caseStudy.decisionFr, caseStudy.decisionEn)}
                    />

                    <Block
                      className={styles.detailBlock}
                      label={getText("Implémentation", "Implementation")}
                      value={getText(
                        caseStudy.implementationFr,
                        caseStudy.implementationEn,
                      )}
                    />
                  </div>

                  <Block
                    className={styles.proof}
                    label={getText("Preuve / validation", "Evidence / validation")}
                    value={proof}
                  />

                  <Block
                    className={styles.detailBlock}
                    label={getText("Limites", "Limits")}
                    value={getText(caseStudy.limitsFr, caseStudy.limitsEn)}
                  />

                  <Block
                    className={styles.detailBlock}
                    label={getText("Et ensuite", "Next steps")}
                    value={getText(caseStudy.nextFr, caseStudy.nextEn)}
                  />

                  <Block
                    className={styles.takeaway}
                    label={getText("Ce que j'en retiens", "What I learned")}
                    value={getText(caseStudy.takeawayFr, caseStudy.takeawayEn)}
                  />
                </>
              )}

              {!caseStudy && (
                <Block
                  className={styles.proof}
                  label={getText("Preuve / validation", "Evidence / validation")}
                  value={proof}
                />
              )}

              <div className={styles.links}>
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className={styles.link}
                  >
                    <FaGithub size={17} aria-hidden="true" />
                    <span>{getText("Voir le code", "View the code")}</span>
                    <ArrowUpRight size={15} strokeWidth={1.7} aria-hidden="true" />
                  </a>
                )}

                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noreferrer"
                    className={styles.link}
                  >
                    <ExternalLink size={16} strokeWidth={1.7} aria-hidden="true" />
                    <span>{getText("Voir le projet", "View project")}</span>
                    <ArrowUpRight size={15} strokeWidth={1.7} aria-hidden="true" />
                  </a>
                )}

                {project.figma && (
                  <a
                    href={project.figma}
                    target="_blank"
                    rel="noreferrer"
                    className={styles.link}
                  >
                    <ExternalLink size={16} strokeWidth={1.7} aria-hidden="true" />
                    <span>Figma</span>
                    <ArrowUpRight size={15} strokeWidth={1.7} aria-hidden="true" />
                  </a>
                )}
              </div>
            </div>

            <aside className={styles.visual}>
              <div className={styles.visualFrame}>
                <div className={styles.visualBar}>
                  <span>{getText("Aperçu", "Preview")}</span>
                  <span>{position}</span>
                </div>

                <div className={styles.visualContent}>
                  <ProjectVisual project={project} lang={lang} preferImage />
                </div>
              </div>

              {gallery.length > 0 && (
                <div className={styles.gallery}>
                  {gallery.map((shot) => (
                    <figure className={styles.shot} key={shot.src}>
                      <a href={shot.src} target="_blank" rel="noreferrer">
                        <img
                          src={shot.src}
                          alt={getText(shot.altFr, shot.altEn)}
                          width={shot.width}
                          height={shot.height}
                          loading="lazy"
                          decoding="async"
                        />
                      </a>
                      <figcaption>
                        {getText(shot.captionFr, shot.captionEn)}
                      </figcaption>
                    </figure>
                  ))}
                </div>
              )}
            </aside>
          </article>
        </Reveal>
      </div>
    </section>
  );
}