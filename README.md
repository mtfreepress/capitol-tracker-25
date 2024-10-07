# Montana Free Press 2025 Capitol Tracker

This project is an effort to make the quantifiable aspects of the Montana Legislature more accessible to the public by compiling information about lawmakers, proposed bills and the legislative process. This is an effort of [Montana Free Press](http://montanafreepress.org/), a 501(c)(3) nonprofit newsroom that aims to provide Montanans with in-depth, nonpartisan news coverage.

A live version of this project is available at https://projects.montanafreepress.org/capitol-tracker-2025/.

The information presented here via is collected from a variety of sources including the Montana Legislature’s public roster and its official bill-tracking system, the [Legislative Automated Workflow System](http://laws.leg.mt.gov/legprd/law0203w$.startup?P_SESS=20211), or LAWS. Reporting and web design was done primarily by MTFP data reporter Eric Dietrich. Please contact him at edietrich@montanafreepress.org with bug reports, questions or suggestions.

Bill tracking data from the LAWS system is collected via a GitHub Actions-powered scraper housed in a separate repository, https://github.com/eidietrich/laws-interface.

## Project organization

- `/inputs` - Contains repositories for data pipelines that feed into the tracker
    - `/annotations` - Pulls manually crafted bill/lawmaker annotations and other custom text from a standalone [Strapi](https://strapi.io/) CMS. See https://github.com/eidietrich/backend-mtleg-2023.
    - `/coverage` - Pulls a list of stories tagged as legislative coverage from MTFP's main Wordpress CMS.
    - `/hearing-transcripts` - Pulls a list of transcripts associated with legislative hearings from OpenMontana's [Mountana State Legislature implementation](https://www.openmontana.org/montana-legislature-council-data-project/#/events) of the [Council Data Project](https://councildataproject.org/).
    - `/lawmakers` - Compiles lawmaker roster information from a variety of inputs. This data is mostly static but needs to be compiled one time for the session and updated to account for resignations, appointemnts etc.
    - `/laws` - Pulls bill, vote and other procedural data from MTFP's [LAWS Interface pipeline]( https://github.com/eidietrich/laws-interface).

- `/process` - Cleans and organizes data provided by input pipelines for presentation in the frontend app
    - main.js - Primary script
    - `/models` - Contains JS classes for each of the system's major data models.
    - `/config` - Tries to be a place to abstract out process + roster information. This could be cleaner. In general, `main.js` should crash or log a warning message if it needs something from a config file it isn't gettting.
        - `people.js` - Includes map for cleaning lawmaker name variations
        - `procedure.js` - Includes config objects for mapping specific bill actions to a form the data system can parse.
        - `overrides.js` - Place for stashing data overrides where we need to short-circuit the formal data pipelines.

- `/app` - Frontend data presentation, a [Gatsby.js](https://www.gatsbyjs.com/) app. App is rebuilt on each data update and deployed to Amazon S3 as a bundle of static HTML/CSS/JS files.
    - `/src/pages` - One-off guide pages
    - `/src/templates` - Templates for pages generated from app data (lawmakers, bills, committees)
    - `/src/data-nodes` - JSON data files that are fed into Gatsby's GraphQL database.
    - `/src/data` - JSON data files that are deliberately kept out of Gatsby's GraphQL database to make performance manageable (bill actions specifically were causing problems). Bill actions are split among multiple files to avoid exceeding Git's file size constraints.
    - `html.js` - Custom HTML template so app pages are properly integrated with MTFP's Parsley analytics system.
    
- `.github/workflows` - GitHub actions scripts. Primary update/rebuild/deploy script is `main.yml`.


## Commands


## References
- Deploying via GH Actions: https://www.alexhyett.com/github-actions-deploy-to-s3/
- Cross-repo GH workflow coordination: https://utensils.io/articles/trigger-github-actions-from-another-repo


––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
