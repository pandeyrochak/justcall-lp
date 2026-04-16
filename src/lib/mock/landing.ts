import type { LandingPageData } from "@/lib/types/content";

export const mockLandingData: LandingPageData = {
  hero: {
    heading: "Help Your Team Sell Better, Every Day",
    description:
      "JustCall gives sales managers a system that protects speed, enforces follow-ups, and surfaces problems early, so reps perform consistently without micromanagement.",
    image: "/hero-image.png",
  },

  problem: {
    heading: "When you manage reps, execution is the real problem",
    description:
      "As a sales manager, you\u2019re responsible for making sure leads are contacted fast, meetings show up on the calendar, your reps improve continuously, and you\u2019re consistently meeting targets.\nBut in reality, things are a little different.",
    cards: [
      { icon: "hourglass", title: "Reps dialing slowly or inconsistently" },
      { icon: "link-off", title: "Missed follow-ups that stall deals" },
      { icon: "file-x", title: "CRM notes written hours later or never" },
      { icon: "user-alert", title: "Coaching based on partial information" },
    ],
    bottomText:
      "You don\u2019t need more pressure or reminders. You need a system that keeps reps moving forward automatically.",
  },

  productFeatures: [
    {
      heading: "Turn rep activity into consistent results",
      description:
        "JustCall helps sales managers create speed, accountability, and clarity, without slowing reps down or adding admin work.",
      featureTitle: "Help reps talk to more live prospects each day",
      featureDescription:
        "More conversations beat more effort. With JustCall, your team is bound to hit more live leads.",
      featureList: [
        "Skip dead calls with power and predictive dialers",
        "Better pickup rates with local presence dialing",
        "Inbound leads routed instantly to available reps",
        "After-hours calls routed to AI agents instantly",
      ],
      featureEndingText:
        "Reps spend their time talking, not waiting, leading to more meetings per rep.",
      featureImage: "/feature-image-1.png",
      layout: "text-left",
    },
    {
      heading: "",
      description: "",
      featureTitle: "Make follow-ups automatic, not an extra step",
      featureDescription:
        "Follow-ups shouldn\u2019t depend on memory, post-its, or best intentions. With JustCall.",
      featureList: [
        "Call outcomes trigger follow-up actions",
        "SMS and callbacks happen on time",
        "Reps stay inside one simple workflow",
      ],
      featureEndingText:
        "Execution stays consistent, even on busy days, which means fewer dropped leads and stalled deals.",
      featureImage: "/feature-image-2.png",
      layout: "text-right",
    },
  ],

  cta: {
    heading: "Build a team that executes without being chased",
    description:
      "When reps have structure and managers have visibility, performance follows. JustCall helps sales managers improve execution, coaching, and results, without burning out their team.",
    image: "/cta-section-image.png",
  },
};
