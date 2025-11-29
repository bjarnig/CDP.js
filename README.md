# CDP.js

Node.js command-line tool for batch processing audio files using CDP (Composer's Desktop Project) transformations. Applies audio effects and transformations to multiple WAV files simultaneously.

## Features

- Batch processing of multiple audio files
- Multi-channel audio support
- 17 audio processing modules (filtering, distortion, modulation, granular synthesis, spectral processing)
- Randomized parameters for each process
- Zero dependencies (Node.js built-in modules only)
- ES6+ JavaScript implementation

## Requirements

- Node.js 14.0.0 or higher
- CDP (Composer's Desktop Project) installed and accessible via PATH
  - Verify installation: `which housekeep` or `housekeep --help`
  - CDP commands (`housekeep`, `distort`, `submix`, etc.) must be in system PATH
- WAV audio files in the working directory

## Installation

### Local Development

```bash
git clone https://github.com/bjarnig/CDP.js.git
cd CDP.js
npm link
```

### Global Installation

```bash
npm install -g cdp.js
```

Or from repository:

```bash
npm install -g git+https://github.com/bjarnig/CDP.js.git
```

Once installed globally, `cdpjs` can be run from any directory.

## Usage

```bash
cdpjs <channels> <process1> [process2] [process3] ...
```

**Parameters:**
- `channels`: Number of audio channels (1=mono, 2=stereo, etc.)
- `process1`, `process2`, etc.: One or more audio processing modules

**Examples:**

```bash
cdpjs 2 cycles filter
cdpjs 1 chords tremolo
cdpjs 2 cycles filter distort fade
cdpjs 2 extend granulate speca pitchspec
```

## Available Processes

1. **cycles** - Cyclic transformations (omit, reform, multiply, divide, delete, fractal, telescope)
2. **chords** - Chordal variations via speed modifications
3. **multi** - Multi-layered processing (interpolation, pitch, filtering)
4. **filter** - Filtering effects (low-pass, high-pass, band-pass, notch, variable)
5. **envel** - Envelope processing with various envelope shapes
6. **distort** - Distortion effects (average, repeat, fractal, overload, interpolate, omit, replim, replace)
7. **fade** - Fade in/out effects with multiple fade curves
8. **granulate** - Granular synthesis with configurable grain parameters
9. **radical** - Radical transformations (reverse, shred, ring modulation, degradation)
10. **delete** - Deletion-based processing using breakpoint files
11. **tremolo** - Tremolo effects with various modulation patterns
12. **zigzag** - Zigzag modulation effects
13. **delverb** - Delay and reverb using impulse responses
14. **transpose** - Pitch transposition (octaves, fifths, sevenths)
15. **speca** - Spectral analysis and processing (stretch, blur, shuffle, spread)
16. **pitchspec** - Pitch-specific spectral processing (chord and tuning operations)
17. **extend** - Time extension effects (loop, zigzag, back-to-back, drunk walk, scramble)

## How It Works

1. Scans current directory for WAV files (excludes files starting with `._`)
2. Splits multi-channel files into separate channel files via `housekeep chans`
3. Applies processing modules to each channel independently
4. Generates multiple variations with randomized parameters per process
5. Combines processed channels using `submix interleave`
6. Removes temporary channel files automatically

## File Structure

```
CDP.js/
├── index.js              # Main entry point
├── package.json          # Project configuration
├── processes/            # Audio processing modules
│   ├── cycles/
│   ├── chords/
│   ├── multi/
│   ├── filter/
│   ├── envel/
│   ├── distort/
│   ├── fade/
│   ├── granulate/
│   ├── radical/
│   ├── delete/
│   ├── tremolo/
│   ├── zigzag/
│   ├── delverb/
│   ├── transpose/
│   ├── speca/
│   ├── pitchspec/
│   └── extend/
└── README.md
```

Process modules contain CDP commands with randomized parameters. Some include breakpoint files (`.brk`, `.txt`) for envelope/timing control or impulse response files (`.wav`) for convolution-based effects.

## Technical Details

**Implementation:**
- ES6 classes for all process modules
- Arrow functions and template literals
- `const`/`let` declarations (no `var`)
- Node.js `child_process.execSync` for command execution

**Error Handling:**
- Errors logged to console
- Processing continues on individual command failures
- Both stdout and stderr captured and displayed

## Output Files

Processed files are saved in the working directory with descriptive suffixes:
- Original: `sound.wav`
- After cycles: `sound_omit.wav`, `sound_reform.wav`, etc.
- After filter: `sound_lopa.wav`, `sound_hipa.wav`, etc.

Each process generates multiple output files with different parameter variations.

## Troubleshooting

**CDP commands not found**: Verify CDP installation and PATH configuration.

**No WAV files found**: Ensure `.wav` files are in the working directory.

**Permission errors**: Verify write permissions in the audio file directory.

**Processing errors**: Validate WAV file format and sample rate compatibility with CDP.

## Contributing

Contributions welcome. Submit a Pull Request.

## License

ISC

## Acknowledgments

Built for CDP (Composer's Desktop Project). See official CDP documentation for more information.
