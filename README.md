# LinkedIn Data Transformer

This Deno module takes LinkedIn Member archive formatted CSV files and converts them to a TypeScript module that can be imported into Deno as a type-safe dataset. The idea is to allow a LinkedIn member's profile to be used in a browser or other JavaScript-friendly environment for further processing and transformation.

In order to use this module you must first [request your LinkedIn Member archive](https://www.linkedin.com/psettings/member-data). 
Once you receive it, unzip all the CSVs and place them into `.secret/<date>` (will not be stored in Git)

Run:

    deno run -A --unstable make.ts 

The Deno script will read the "safe" LinkedIn Member archive CSV files from `.secret/<date>` and transform them into `linkedin-archive-auto.ts`. "Safe" in this case means the LinkedIn data that would be contained in a public profile. No data that would be hidden to the profile owner will be included in the transformed file.

The transformed file can be bundled as JavaScript, converted to JSON, or used as a type-safe TypeScript "data module". 
