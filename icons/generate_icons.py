#!/usr/bin/env python3
"""
Weekly Icon Generator
Generates placeholder icons for the PWA in various sizes
Requires: Pillow (pip install pillow)
"""

try:
    from PIL import Image, ImageDraw, ImageFont
    import os
except ImportError:
    print("❌ Error: Pillow library not found!")
    print("Install it with: pip install pillow")
    exit(1)


def generate_icon(size):
    """Generate a simple icon with the app's jade green color and a checkmark"""
    
    # Create image with jade green background
    img = Image.new('RGBA', (size, size), '#00BB77')
    draw = ImageDraw.Draw(img)
    
    # Calculate sizes
    padding = size // 4
    line_width = max(size // 15, 2)
    
    # Draw rounded rectangle background
    # (Pillow's rounded_rectangle available in newer versions)
    
    # Draw checkmark
    check_points = [
        (padding + size // 8, size // 2),
        (padding + size // 4, size // 2 + size // 6),
        (size - padding - size // 8, size // 2 - size // 6)
    ]
    
    # Draw checkmark lines
    draw.line([check_points[0], check_points[1]], fill='white', width=line_width)
    draw.line([check_points[1], check_points[2]], fill='white', width=line_width)
    
    # Try to add text "W" at bottom
    try:
        # Try to load a font, fallback to default if not available
        try:
            font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", size // 6)
        except:
            try:
                font = ImageFont.truetype("arial.ttf", size // 6)
            except:
                font = ImageFont.load_default()
        
        # Draw "W" letter
        text = "W"
        bbox = draw.textbbox((0, 0), text, font=font)
        text_width = bbox[2] - bbox[0]
        text_height = bbox[3] - bbox[1]
        text_x = (size - text_width) // 2
        text_y = size - padding // 2 - text_height
        draw.text((text_x, text_y), text, fill='white', font=font)
    except Exception as e:
        print(f"   Note: Could not add text to icon: {e}")
    
    return img


def main():
    """Generate all icon sizes"""
    
    print("🎨 Weekly Icon Generator")
    print("=" * 50)
    
    # Icon sizes needed
    sizes = [72, 96, 128, 144, 152, 192, 384, 512]
    
    # Create icons directory if it doesn't exist
    icons_dir = os.path.dirname(os.path.abspath(__file__))
    
    print(f"\n📁 Icons directory: {icons_dir}")
    print(f"📋 Generating {len(sizes)} icon sizes...\n")
    
    # Generate each icon
    for size in sizes:
        filename = f"icon-{size}x{size}.png"
        filepath = os.path.join(icons_dir, filename)
        
        try:
            img = generate_icon(size)
            img.save(filepath, 'PNG', optimize=True)
            print(f"   ✅ Generated: {filename}")
        except Exception as e:
            print(f"   ❌ Error generating {filename}: {e}")
    
    print("\n" + "=" * 50)
    print("✨ Icon generation complete!")
    print("\n📝 Next steps:")
    print("   1. Review the generated icons in the icons/ folder")
    print("   2. For production, replace with professionally designed icons")
    print("   3. Ensure all icons are optimized for web use")


if __name__ == "__main__":
    main()
