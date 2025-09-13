# CDP.js

A Node.js command-line tool for batch processing audio files using CDP (Composer's Desktop Project) transformations. This tool allows you to apply various audio effects and transformations to multiple WAV files simultaneously from the terminal.

## Features

- **Batch Processing**: Process multiple audio files at once
- **Multi-channel Support**: Handle stereo and multi-channel audio files
- **15 Audio Processes**: Wide variety of audio transformations including filtering, distortion, modulation, and more
- **Command-line Interface**: Easy-to-use terminal interface
- **Randomized Parameters**: Each process uses randomized parameters for unique results

## Installation

1. Clone the repository:
```bash
git clone https://github.com/bjarnig/CDP.js.git
cd CDP.js
```

2. Install dependencies:
```bash
npm install
```

3. Install globally to use the `cdpjs` command:
```bash
npm link
```

## Requirements

- Node.js
- CDP (Composer's Desktop Project) installed and accessible from command line
- WAV audio files in the project directory

## Usage

```bash
cdpjs <channels> <process1> [process2] [process3] ...
```

### Parameters

- `channels`: Number of audio channels (e.g., 2 for stereo)
- `process1`, `process2`, etc.: One or more audio processing modules to apply

### Available Processes

1. **cycles** - Applies various cyclic transformations (omit, reform, multiply, divide, delete, fractal, telescope)
2. **chords** - Creates chordal variations using speed modifications
3. **multi** - Multi-layered processing
4. **filter** - Various filtering effects (low-pass, high-pass, band-pass, notch)
5. **envel** - Envelope processing
6. **distort** - Distortion effects
7. **fade** - Fade in/out effects
8. **granulate** - Granular synthesis
9. **radical** - Radical audio transformations
10. **delete** - Deletion-based processing
11. **tremolo** - Tremolo effects
12. **zigzag** - Zigzag modulation
13. **delverb** - Delay and reverb effects
14. **transpose** - Pitch transposition
15. **speca** - Spectral analysis and processing
16. **pitchspec** - Pitch-specific spectral processing

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

## How It Works

1. The tool scans the current directory for WAV files
2. Splits multi-channel files into separate channel files
3. Applies the specified processing modules to each channel
4. Combines the processed channels back into the original format
5. Cleans up temporary files

## File Structure

- `index.js` - Main application entry point
- `processes/` - Directory containing all audio processing modules
- Each process module contains the specific CDP commands and parameters for that effect

## License

ISC
