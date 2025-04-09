import os
import fnmatch
from pathlib import Path


def clean_line_terminators(text):
    """Replace unusual line terminators with standard newlines"""
    unusual_terminators = [
        '\u2028',  # Line Separator (LS)
        '\u2029',  # Paragraph Separator (PS)
        '\r',      # Carriage Return
    ]
    for term in unusual_terminators:
        text = text.replace(term, '\n')
    return text


def parse_gitignore(directory):
    """Parse .gitignore file and return patterns to exclude"""
    gitignore_path = os.path.join(directory, '.gitignore')
    patterns = ["node_modules",  "build", ]

    if os.path.exists(gitignore_path):
        with open(gitignore_path, 'r', encoding='utf-8') as f:
            for line in f:
                line = line.strip()
                if line and not line.startswith('#'):
                    patterns.append(line)

    return patterns


def is_ignored(path, gitignore_patterns, root_directory):
    """Check if a path matches any .gitignore pattern"""
    rel_path = os.path.relpath(path, root_directory)
    is_dir = os.path.isdir(path)

    for pattern in gitignore_patterns:
        if pattern.endswith('/'):
            if is_dir and fnmatch.fnmatch(rel_path, pattern[:-1]):
                return True
            if fnmatch.fnmatch(rel_path, pattern[:-1] + '/*'):
                return True
        else:
            if fnmatch.fnmatch(rel_path, pattern):
                return True
            if fnmatch.fnmatch(os.path.basename(path), pattern):
                return True

    return False


def get_directory_context(directory_path, output_file=None, max_file_size=100000):
    """
    Generate a clean directory context that:
    - Respects .gitignore
    - Handles unusual line terminators
    - Provides structured output
    """
    context = []

    context.append(f"Directory Context for: {directory_path}")
    context.append("=" * 80)

    for root, dirs, files in os.walk(directory_path):
        gitignore_patterns = parse_gitignore(root)

        dirs[:] = [d for d in dirs
                   if not d.startswith('.') and
                   not is_ignored(os.path.join(root, d), gitignore_patterns, directory_path)]

        level = root.replace(directory_path, '').count(os.sep)
        indent = ' ' * 4 * level
        context.append(f"{indent}{os.path.basename(root)}/")

        subindent = ' ' * 4 * (level + 1)

        for file in files:
            file_path = os.path.join(root, file)

            if (file.startswith('.') or
                    is_ignored(file_path, gitignore_patterns, directory_path)):
                continue

            try:
                file_stat = os.stat(file_path)
                context.append(
                    f"{subindent}{file} (Size: {file_stat.st_size} bytes)")

                if file_stat.st_size <= max_file_size:
                    try:
                        with open(file_path, 'r', encoding='utf-8') as f:
                            content = clean_line_terminators(f.read())

                        if content.strip():
                            context.append(f"{subindent}Content:")
                            for line in content.split('\n'):
                                context.append(f"{subindent}  {line}")
                    except UnicodeDecodeError:
                        context.append(f"{subindent}  [Binary content]")

                context.append("")
            except Exception as e:
                context.append(f"{subindent}[Error: {str(e)}]")

    # Write output with proper line endings
    full_context = '\n'.join(context)
    if output_file:
        with open(output_file, 'w', encoding='utf-8', newline='\n') as f:
            f.write(full_context)
        print(f"Clean directory context saved to: {output_file}")
    else:
        print(full_context)


if __name__ == "__main__":

    get_directory_context('.', './output.txt')
