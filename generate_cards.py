import os
from PIL import Image, ImageDraw, ImageFont, ImageFilter

CARD_W, CARD_H = 1080, 1080
FONT_BOLD = r'C:\Windows\Fonts\arialbd.ttf'
FONT_REG = r'C:\Windows\Fonts\arial.ttf'
FONT_SEGOE_B = r'C:\Windows\Fonts\segoeuib.ttf' if os.path.exists(r'C:\Windows\Fonts\segoeuib.ttf') else FONT_BOLD
FONT_SEGOE = r'C:\Windows\Fonts\segoeui.ttf' if os.path.exists(r'C:\Windows\Fonts\segoeui.ttf') else FONT_REG

CYAN = (0, 229, 255, 255)
ORANGE = (255, 90, 20, 255)
WHITE = (255, 255, 255, 255)
MUTED = (185, 205, 225, 255)
CARD_BG = (12, 18, 28, 235)
CARD_BORDER = (0, 229, 255, 110)

def draw_vector_check(draw, x, y, size=20, color=CYAN, width=3):
    p1 = (x, y + size * 0.52)
    p2 = (x + size * 0.38, y + size * 0.9)
    p3 = (x + size, y + size * 0.15)
    draw.line([p1, p2], fill=color, width=width)
    draw.line([p2, p3], fill=color, width=width)

def draw_pin(draw, x, y, color=CYAN):
    # Small map pin icon
    draw.ellipse([x, y, x + 14, y + 14], fill=color)
    draw.polygon([(x + 2, y + 10), (x + 12, y + 10), (x + 7, y + 20)], fill=color)
    draw.ellipse([x + 4, y + 4, x + 10, y + 10], fill=(12, 18, 28, 255))

def draw_phone(draw, x, y, color=ORANGE):
    # Small phone icon
    draw.rounded_rectangle([x, y, x + 14, y + 22], radius=3, outline=color, width=2)
    draw.ellipse([x + 5, y + 16, x + 9, y + 18], fill=color)

def create_base(image_path, target_w=1080, target_h=1080):
    bg = Image.open(image_path).convert('RGBA')
    bg_ratio = bg.width / bg.height
    target_ratio = target_w / target_h

    if bg_ratio > target_ratio:
        new_h = target_h
        new_w = int(new_h * bg_ratio)
    else:
        new_w = target_w
        new_h = int(new_w / bg_ratio)

    bg = bg.resize((new_w, new_h), Image.Resampling.LANCZOS)
    left = (new_w - target_w) // 2
    top = (new_h - target_h) // 2
    return bg.crop((left, top, left + target_w, top + target_h))

def add_header(overlay, draw, badge_text, badge_color=ORANGE):
    # Top gradient
    for y in range(220):
        alpha = int(220 * (1 - y / 220.0))
        draw.line([(0, y), (CARD_W, y)], fill=(10, 14, 22, alpha))

    # Logo
    logo = Image.open('logo_transparent.png').convert('RGBA')
    l_w = 300
    l_h = int(logo.height * (l_w / logo.width))
    logo = logo.resize((l_w, l_h), Image.Resampling.LANCZOS)

    # Logo glass container
    draw.rounded_rectangle([35, 25, 35 + l_w + 30, 25 + l_h + 16], radius=16, fill=(13, 19, 29, 220), outline=(0, 229, 255, 90), width=2)
    overlay.paste(logo, (50, 33), logo)

    # Top right category badge
    font_badge = ImageFont.truetype(FONT_SEGOE_B, 22)
    bbox = font_badge.getbbox(badge_text)
    tw = bbox[2] - bbox[0]
    th = bbox[3] - bbox[1]
    bx2 = CARD_W - 40
    bx1 = bx2 - tw - 46
    by1 = 35
    by2 = by1 + 52
    draw.rounded_rectangle([bx1, by1, bx2, by2], radius=26, fill=badge_color)
    draw.text((bx1 + 23, by1 + 13), badge_text, font=font_badge, fill=WHITE)

def build_card(photo_path, badge_text, badge_color, title, subtitle, price_main, price_period, price_secondary, features, output_filename):
    bg = create_base(photo_path, CARD_W, CARD_H)
    overlay = Image.new('RGBA', (CARD_W, CARD_H), (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)

    add_header(overlay, draw, badge_text, badge_color)

    # Dark gradient bottom
    for y in range(500, CARD_H):
        alpha = int(240 * ((y - 500) / (CARD_H - 500)) ** 1.2)
        draw.line([(0, y), (CARD_W, y)], fill=(8, 12, 20, alpha))

    # Card Panel
    c_y1 = 570
    c_y2 = 1030
    draw.rounded_rectangle([40, c_y1, CARD_W - 40, c_y2], radius=24, fill=CARD_BG, outline=CARD_BORDER, width=2)

    # Title & Subtitle
    f_title = ImageFont.truetype(FONT_SEGOE_B, 40)
    draw.text((75, c_y1 + 30), title, font=f_title, fill=WHITE)

    f_sub = ImageFont.truetype(FONT_SEGOE, 23)
    draw.text((75, c_y1 + 82), subtitle, font=f_sub, fill=MUTED)

    # Price section
    f_curr = ImageFont.truetype(FONT_SEGOE_B, 34)
    f_price = ImageFont.truetype(FONT_SEGOE_B, 74)
    f_period = ImageFont.truetype(FONT_SEGOE, 28)
    f_sec = ImageFont.truetype(FONT_SEGOE_B, 24)

    curr_y = c_y1 + 155
    if price_main == 'Incluso':
        draw.text((75, curr_y - 20), '100% CORTESIA', font=f_price, fill=CYAN)
        draw.text((75, curr_y + 60), 'Incluso gratuitamente em todos os planos', font=f_period, fill=WHITE)
    else:
        draw.text((75, curr_y + 12), 'R$', font=f_curr, fill=CYAN)
        draw.text((125, curr_y - 20), price_main, font=f_price, fill=CYAN)
        p_box = f_price.getbbox(price_main)
        pw = p_box[2] - p_box[0]
        draw.text((135 + pw, curr_y + 12), price_period, font=f_period, fill=WHITE)
        if price_secondary:
            draw.text((150 + pw + 180, curr_y + 15), price_secondary, font=f_sec, fill=ORANGE)

    # Separator
    sep_y = c_y1 + 225
    draw.line([(75, sep_y), (CARD_W - 75, sep_y)], fill=(35, 50, 70, 255), width=2)

    # Features (2 columns)
    f_feat = ImageFont.truetype(FONT_SEGOE, 23)
    feat_y = sep_y + 25
    col_w = (CARD_W - 150) // 2

    for i, feat in enumerate(features):
        col = i % 2
        row = i // 2
        fx = 75 + col * (col_w + 20)
        fy = feat_y + row * 45
        draw_vector_check(draw, fx, fy + 2, size=20, color=CYAN, width=3)
        draw.text((fx + 30, fy), feat, font=f_feat, fill=(235, 242, 250, 255))

    # Footer
    foot_sep = c_y2 - 65
    draw.line([(75, foot_sep), (CARD_W - 75, foot_sep)], fill=(30, 45, 65, 255), width=1)
    
    draw_pin(draw, 75, foot_sep + 20, CYAN)
    f_foot = ImageFont.truetype(FONT_SEGOE_B, 21)
    draw.text((105, foot_sep + 18), 'R. Venceslau Braz, 33 - Jd. Rincão, Arujá/SP', font=f_foot, fill=MUTED)

    draw_phone(draw, CARD_W - 350, foot_sep + 18, ORANGE)
    draw.text((CARD_W - 325, foot_sep + 18), '(11) 97427-1649', font=f_foot, fill=ORANGE)

    final = Image.alpha_composite(bg, overlay)
    os.makedirs('presentation_cards', exist_ok=True)
    out_path = os.path.join('presentation_cards', output_filename)
    final.convert('RGB').save(out_path, quality=95)
    print(f'Saved {out_path}')

# Generate the 5 square cards
cards_data = [
    {
        'photo': 'raw_maps_photos/photo_4.jpg',
        'badge': 'HOT DESK • DIÁRIA',
        'color': ORANGE,
        'title': 'Estação de Trabalho Compartilhada',
        'subtitle': 'Produtividade máxima, networking e infraestrutura completa',
        'price_main': '39',
        'price_period': ',00 / dia',
        'price_sec': 'ou R$ 12,00 / hora',
        'features': [
            'Wi-Fi Fibra 500 Mega Alta Velocidade',
            'Ambiente 100% climatizado com ar',
            'Café expresso e água à vontade',
            'Tomadas individuais e rede segura',
            'Lockers e armários privativos',
            'Sem fiador e sem burocracia'
        ],
        'file': 'card_1_estacao_compartilhada.jpg'
    },
    {
        'photo': 'raw_maps_photos/photo_6.jpg',
        'badge': 'MESA FIXA • EXCLUSIVA',
        'color': (0, 180, 240, 255),
        'title': 'Mesa Dedicada Mensal (Posição Fixa)',
        'subtitle': 'A sua estação de trabalho exclusiva todos os dias',
        'price_main': '590',
        'price_period': ',00 / mês',
        'price_sec': 'Semestral: R$ 520,00/mês',
        'features': [
            'Sua mesa exclusiva reservada',
            'Gaveteiro individual com chave',
            'Acesso estendido ao espaço',
            'Endereço comercial incluso',
            '2h de sala de reunião por mês',
            'Café, água e copa liberados'
        ],
        'file': 'card_2_mesa_fixa_mensal.jpg'
    },
    {
        'photo': 'raw_maps_photos/photo_7.jpg',
        'badge': 'REUNIÕES & CLIENTES',
        'color': (230, 45, 80, 255),
        'title': 'Sala de Reunião Executiva',
        'subtitle': 'Receba seus clientes e parceiros em um ambiente profissional',
        'price_main': '45',
        'price_period': ',00 / hora',
        'price_sec': 'Turno 4h: R$ 150,00',
        'features': [
            'Capacidade para até 8 pessoas',
            'Mesa ampla e cadeiras executivas',
            'Smart TV para apresentações',
            'Quadro branco e climatização',
            'Wi-Fi dedicado para vídeo',
            'Serviço de café para convidados'
        ],
        'file': 'card_3_sala_de_reuniao.jpg'
    },
    {
        'photo': 'raw_maps_photos/photo_9.jpg',
        'badge': 'CNPJ & CREDIBILIDADE',
        'color': (40, 190, 100, 255),
        'title': 'Endereço Fiscal & Escritório Virtual',
        'subtitle': 'Sua empresa com endereço profissional registrado em Arujá',
        'price_main': '120',
        'price_period': ',00 / mês',
        'price_sec': 'Fiscal + Comercial: R$ 160/mês',
        'features': [
            'Registro oficial para CNPJ e alvará',
            'Divulgação em site, cartões e docs',
            'Gestão ativa de correspondências',
            'Aviso imediato via WhatsApp',
            'Desconto especial em salas',
            'Atendimento e recepção'
        ],
        'file': 'card_4_endereco_fiscal.jpg'
    },
    {
        'photo': 'raw_maps_photos/photo_8.jpg',
        'badge': 'ESTRUTURA & COPA',
        'color': (255, 170, 0, 255),
        'title': 'Espaço Café & Convivência',
        'subtitle': 'Pausas relaxantes, cafeteria equipada e integração',
        'price_main': 'Incluso',
        'price_period': ' em todos os planos',
        'price_sec': '',
        'features': [
            'Café fresco e água filtrada',
            'Frigobar, micro-ondas e pia',
            'Ambiente descontraído e moderno',
            'Área para refeições e lanches',
            'Estacionamento próprio no local',
            'Fácil acesso no centro de Arujá'
        ],
        'file': 'card_5_espaco_copa_cafe.jpg'
    }
]

for card in cards_data:
    build_card(
        photo_path=card['photo'],
        badge_text=card['badge'],
        badge_color=card['color'],
        title=card['title'],
        subtitle=card['subtitle'],
        price_main=card['price_main'],
        price_period=card['price_period'],
        price_secondary=card['price_sec'],
        features=card['features'],
        output_filename=card['file']
    )

print('All 5 individual cards generated successfully.')
