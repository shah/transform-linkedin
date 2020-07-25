import * as ap from "https://denopkg.com/shah/artifacts-persistence@v1.0.17/mod.ts";
import { transformCSV as trCSV } from "https://denopkg.com/shah/content-model-typescript@v1.0.5/mod.ts";
import * as inflect from "https://denopkg.com/shah/text-inflect@v1.0.4/mod.ts";

const ph = new ap.FileSystemPersistenceHandler({
  destPath: ".",
  projectPath: ".",
});
const linkedInExportUnzippedFilesPath = ".secret/2020-07-07";
const transformer = new trCSV.TransformCsvContentToTypeScript(ph);
await transformer.transformSourcesWithHeadersIntoSingleModule(
  {
    moduleName: inflect.guessCaseValue("linkedin-archive-auto"),
    interfIdentifier: inflect.guessCaseValue("Linked In Archive"),
    constIdentifier: inflect.guessCaseValue("Linked In Archive"),
    emitEmptyContent: true,
  },
  [
    new trCSV.CsvFileSource(
      `${linkedInExportUnzippedFilesPath}/Profile.csv`,
      {
        allowSingleRowAsObject: true,
      },
      { interfIdentifier: inflect.guessCaseValue("Profile") },
    ),
    ...([
      "Education",
      "Events",
      "Patents",
      "Positions",
      "Projects",
      "Publications",
      "Recommendations Given",
      "Recommendations Received",
      "Skills",
    ].map((component) =>
      new trCSV.CsvFileSource(
        `${linkedInExportUnzippedFilesPath}/${component}.csv`,
        {},
        { interfIdentifier: inflect.guessCaseValue(component) },
      )
    )),
  ],
);
