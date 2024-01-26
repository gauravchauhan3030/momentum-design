import { mockSVGFontBuffer } from "../../../test/fixtures/transformer.fixtures";
import { Formats, OptimizedSVGFormat } from "../types";
import SVGTransformer from "./svg-transformer";
import Transformer from "./transformer";
// import path from "path";

describe("@momentum-design/builder - SVG Transformer", () => {
  let transformer: SVGTransformer;
  const FORMAT: Formats = { config: { fontName: "MyFont" }, type: "OPTIMIZED_SVG" } as OptimizedSVGFormat;

  //   const svgTransformer = new SVGTransformer({ type: "SVG_FONT", config: { fontName: "MyFont" } }, "dist");

  beforeEach(() => {
    transformer = new SVGTransformer(FORMAT, "dist");
    //@ts-ignore
    jest.spyOn(transformer.logger, "debug").mockImplementation(() => {});
  });
  describe("constructor()", () => {
    it("should extend Builder", () => {
      expect(transformer instanceof Transformer).toBe(true);
    });
    it("should mount the format provided to the class object", () => {
      expect(transformer.format).toBe(FORMAT);
      expect(transformer.destination).toBe("dist");
    });
  });

  describe("transformFilesSync", () => {
    it("modifies the class properties correctly", async () => {
      transformer.inputFiles = [{ srcPath: "font", distPath: "font", data: mockSVGFontBuffer }];
      const optimizeSpy = jest.spyOn(transformer, "optimize");
      expect(transformer.outputFiles).toEqual(undefined);
      await transformer.transformFilesSync();
      expect(optimizeSpy).toBeCalledTimes(1);
      console.log(transformer.outputFiles);
      expect(transformer.outputFiles).toEqual([
        {
          data: expect.anything(),
          distPath: "font",
          srcPath: "font",
        },
      ]);
    });
  });
});
