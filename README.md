# CDP.js

A modern Node.js command-line tool for batch processing audio files using CDP (Composer's Desktop Project) transformations. This tool allows you to apply various audio effects and transformations to multiple WAV files simultaneously from the terminal.

## Features

- **Batch Processing**: Process multiple audio files at once
- **Multi-channel Support**: Handle stereo and multi-channel audio files
- **16 Audio Processes**: Wide variety of audio transformations including filtering, distortion, modulation, granular synthesis, and more
- **Command-line Interface**: Easy-to-use terminal interface
- **Randomized Parameters**: Each process uses randomized parameters for unique results
- **Modern JavaScript**: Built with ES6+ features (classes, arrow functions, const/let)
- **Zero Dependencies**: Uses only Node.js built-in modules

## Requirements

- **Node.js**: Version 14.0.0 or higher
- **CDP (Composer's Desktop Project)**: Must be installed and accessible from command line
- **WAV Audio Files**: Place your `.wav` files in the project directory

## Installation

1. Clone the repository:
```bash
git clone https://github.com/bjarnig/CDP.js.git
cd CDP.js
```

2. Install globally to use the `cdpjs` command:
```bash
npm link
```

**Note**: This project has no external dependencies. All functionality uses Node.js built-in modules.

## Usage

```bash
cdpjs <channels> <process1> [process2] [process3] ...
```

### Parameters

- `channels`: Number of audio channels (e.g., `1` for mono, `2` for stereo)
- `process1`, `process2`, etc.: One or more audio processing modules to apply

### Available Processes

The tool provides 16 different audio processing modules:

1. **cycles** - Applies various cyclic transformations (omit, reform, multiply, divide, delete, fractal, telescope)
2. **chords** - Creates chordal variations using speed modifications
3. **multi** - Multi-layered processing with interpolation, pitch, filtering, and more
4. **filter** - Various filtering effects (low-pass, high-pass, band-pass, notch, variable filters)
5. **envel** - Envelope processing with different envelope shapes
6. **distort** - Distortion effects (average, repeat, fractal, overload, interpolate, omit, replim, replace)
7. **fade** - Fade in/out effects with multiple fade curves
8. **granulate** - Granular synthesis with various grain parameters
9. **radical** - Radical audio transformations (reverse, shred, ring modulation, degradation)
10. **delete** - Deletion-based processing using breakpoint files
11. **tremolo** - Tremolo effects with various modulation patterns
12. **zigzag** - Zigzag modulation effects
13. **delverb** - Delay and reverb effects using impulse responses
14. **transpose** - Pitch transposition (octaves, fifths, sevenths)
15. **speca** - Spectral analysis and processing (stretch, blur, shuffle, spread)
16. **pitchspec** - Pitch-specific spectral processing with chord and tuning operations
17. **extend** - Time extension effects (loop, zigzag, back-to-back, drunk walk, scramble)

### Examples

Process stereo files with cycles and filter effects:
```bash
cdpjs 2 cycles filter
```

Process mono files with chords and tremolo:
```bash
cdpjs 1 chords tremolo
```

Apply multiple effects in sequence:
```bash
cdpjs 2 cycles filter distort fade
```

Create complex transformations:
```bash
cdpjs 2 extend granulate speca pitchspec
```

## How It Works

1. The tool scans the current directory for WAV files (ignoring files starting with `._`)
2. Splits multi-channel files into separate channel files using CDP's `housekeep chans` command
3. Applies the specified processing modules to each channel independently
4. Each process generates multiple variations with randomized parameters
5. Combines the processed channels back into the original format using `submix interleave`
6. Cleans up temporary channel files automatically

## File Structure

```
CDP.js/
├── index.js              # Main application entry point
├── package.json          # Project configuration
├── processes/            # Directory containing all audio processing modules
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

Each process module:
- Contains the specific CDP commands and parameters for that effect
- Uses randomized parameters within defined ranges for unique results
- May include breakpoint files (`.brk`, `.txt`) for envelope and timing control
- May include impulse response files (`.wav`) for convolution-based effects

## Technical Details

### Modern JavaScript Features

This project has been modernized to use:
- **ES6 Classes**: All process modules use class syntax instead of function constructors
- **Arrow Functions**: Used throughout for cleaner, more concise code
- **const/let**: Replaced all `var` declarations with `const` and `let`
- **Template Literals**: Used for string interpolation
- **Built-in Modules**: Uses Node.js `child_process.execSync` instead of deprecated packages

### Error Handling

The tool includes error handling for CDP command execution:
- Errors are logged to the console
- Processing continues even if individual commands fail
- Both stdout and stderr are captured and displayed

## Output Files

Processed files are saved in the same directory with descriptive suffixes:
- Original: `sound.wav`
- After cycles process: `sound_omit.wav`, `sound_reform.wav`, etc.
- After filter process: `sound_lopa.wav`, `sound_hipa.wav`, etc.

Each process generates multiple output files with different parameter variations.

## Troubleshooting

**CDP commands not found**: Ensure CDP is installed and available in your system PATH.

**No WAV files found**: Make sure your `.wav` files are in the same directory where you run the command.

**Permission errors**: Ensure you have write permissions in the directory containing your audio files.

**Processing errors**: Check that your WAV files are valid and that CDP can process them. Some processes may require specific file formats or sample rates.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

ISC

## Acknowledgments

This tool is built to work with CDP (Composer's Desktop Project), a powerful suite of audio processing tools. For more information about CDP, visit the official CDP documentation.
