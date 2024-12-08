import esbuild from 'esbuild';
import { resolve } from 'path';

// esbuild ./src/index.js --bundle --platform=node --target=node22 --format=esm --outfile=./dist/bundle.js --packages=external --minify --analyze=verbose
try {
    const result = await esbuild.build({
        entryPoints: [resolve(process.cwd(), 'index.js')],
        bundle: true,
        platform: 'node',
        target: 'node23',
        format: 'esm',
        packages: 'external',
        outfile: resolve(process.cwd(), 'dist/bundle.js'),
        minify: true,
        metafile: true,
    });

    console.log('Build successful!\n');
    console.log('Analysis:');
    const analysis = await esbuild.analyzeMetafile(result.metafile);
    console.log(analysis);
} catch (error) {
    console.error('Build failed:', error);
    process.exit(1);
}
