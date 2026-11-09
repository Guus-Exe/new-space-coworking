import os
from PIL import Image, ImageDraw, ImageFont

FONT_BOLD = r'C:\Windows\Fonts\arialbd.ttf'
FONT_REG = r'C:\Windows\Fonts\arial.ttf'
FONT_SEGOE_B = r'C:\Windows\Fonts\segoeuib.ttf' if os.path.exists(r'C:\Windows\Fonts\segoeuib.ttf') else FONT_BOLD
FONT_SEGOE = r'C:\Windows\Fonts\segoeui.ttf' if os.path.exists(r'C:\Windows\Fonts\segoeui.ttf') else FONT_REG

CYAN = (0, 229, 255, 255)
ORANGE = (255, 90, 20, 255)
WHITE = (255, 255, 255, 255)
MUTED = (180, 200, 220, 255)

def draw_vector_check(draw, x, y, size=16, color=CYAN, width=2):
    p1 = (x, y + size * 0.52)
    p2 = (x + size * 0.38, y + size * 0.9)
    p3 = (x + size, y + size * 0.15)
    draw.line([p1, p2], fill=color, width=width)
    draw.line([p2, p3], fill=color, width=width)

def generate_slide_1920():
    W, H = 1920, 1080
    slide = Image.new('RGBA', (W, H), (10, 14, 22, 255))
    draw = ImageDraw.Draw(slide)

    # Subtle ambient background grid / tint
    for y in range(0, H, 40):
        draw.line([(0, y), (W, y)], fill=(16, 22, 34, 255), width=1)
    for x in range(0, W, 40):
        draw.line([(x, 0), (x, H)], fill=(16, 22, 34, 255), width=1)

    # Top Header banner
    draw.rounded_rectangle([40, 30, W - 40, 150], radius=18, fill=(15, 21, 33, 240), outline=(0, 229, 255, 80), width=2)
    
    # Logo
    logo = Image.open('logo_transparent.png').convert('RGBA')
    lw = 270
    lh = int(logo.height * (lw / logo.width))
    logo = logo.resize((lw, lh), Image.Resampling.LANCZOS)
    slide.paste(logo, (70, 48), logo)

    # Header title
    f_ht = ImageFont.truetype(FONT_SEGOE_B, 34)
    draw.text((380, 52), 'TABELA DE PLANOS & SERVIÇOS 2026', font=f_ht, fill=WHITE)
    
    f_hs = ImageFont.truetype(FONT_SEGOE, 20)
    draw.text((380, 96), 'Proposta de Apresentação Comercial • Espaço Corporativo em Arujá/SP', font=f_hs, fill=CYAN)

    # Contact top right
    f_hc = ImageFont.truetype(FONT_SEGOE_B, 19)
    draw.text((W - 440, 56), 'Endereço: R. Venceslau Braz, 33 - Arujá', font=f_hc, fill=MUTED)
    draw.text((W - 440, 92), 'WhatsApp: (11) 97427-1649', font=f_hc, fill=ORANGE)

    # 4 Plan Cards
    plans = [
        {
            'badge': 'DIÁRIA / FLEXÍVEL',
            'badge_bg': ORANGE,
            'title': 'Estação de Trabalho',
            'sub': 'Para foco e flexibilidade',
            'price': 'R$ 39',
            'unit': '/ dia',
            'sec': 'ou R$ 12,00 / hora',
            'photo': 'raw_maps_photos/photo_4.jpg',
            'features': [
                'Wi-Fi Fibra 500 Mega',
                'Ambiente climatizado',
                'Café e água à vontade',
                'Tomadas individuais',
                'Lockers privativos',
                'Uso da área de copa'
            ],
            'highlight': False
        },
        {
            'badge': 'MAIS PROCURADO',
            'badge_bg': CYAN,
            'title': 'Mesa Fixa Mensal',
            'sub': 'Sua mesa exclusiva todo dia',
            'price': 'R$ 590',
            'unit': '/ mês',
            'sec': 'Semestral: R$ 520/mês',
            'photo': 'raw_maps_photos/photo_6.jpg',
            'features': [
                'Mesa fixa 100% dedicada',
                'Gaveteiro com chave',
                'Endereço comercial incluso',
                '2h sala reunião/mês',
                'Café e água liberados',
                'Acesso prioritário'
            ],
            'highlight': True
        },
        {
            'badge': 'REUNIÕES & EVENTOS',
            'badge_bg': (235, 50, 90, 255),
            'title': 'Sala de Reunião',
            'sub': 'Acomoda até 8 pessoas',
            'price': 'R$ 45',
            'unit': '/ hora',
            'sec': 'Turno 4h: R$ 150,00',
            'photo': 'raw_maps_photos/photo_7.jpg',
            'features': [
                'Mesa ampla executiva',
                'Smart TV de alta resolução',
                'Ar-condicionado e lousa',
                'Wi-Fi dedicado para call',
                'Café cortesia a clientes',
                'Privacidade acústica'
            ],
            'highlight': False
        },
        {
            'badge': 'ESCRITÓRIO VIRTUAL',
            'badge_bg': (40, 190, 100, 255),
            'title': 'Endereço Fiscal',
            'sub': 'CNPJ e Alvará em Arujá',
            'price': 'R$ 120',
            'unit': '/ mês',
            'sec': 'Fiscal+Comercial: R$ 160/mês',
            'photo': 'raw_maps_photos/photo_9.jpg',
            'features': [
                'Registro oficial CNPJ',
                'Divulgação profissional',
                'Gestão de correspondência',
                'Aviso via WhatsApp',
                'Desconto em salas',
                'Localização nobre'
            ],
            'highlight': False
        }
    ]

    card_y = 180
    card_h = 770
    spacing = 25
    total_w = W - 80
    col_w = (total_w - spacing * 3) // 4

    f_p_title = ImageFont.truetype(FONT_SEGOE_B, 26)
    f_p_sub = ImageFont.truetype(FONT_SEGOE, 17)
    f_p_price = ImageFont.truetype(FONT_SEGOE_B, 46)
    f_p_unit = ImageFont.truetype(FONT_SEGOE, 20)
    f_p_sec = ImageFont.truetype(FONT_SEGOE_B, 17)
    f_p_feat = ImageFont.truetype(FONT_SEGOE, 18)
    f_badge = ImageFont.truetype(FONT_SEGOE_B, 15)

    for i, p in enumerate(plans):
        cx = 40 + i * (col_w + spacing)
        
        # Border glow if highlighted
        border_col = CYAN if p['highlight'] else (40, 60, 90, 200)
        border_w = 3 if p['highlight'] else 1
        bg_card = (16, 24, 38, 245) if p['highlight'] else (13, 19, 30, 230)
        
        draw.rounded_rectangle([cx, card_y, cx + col_w, card_y + card_h], radius=18, fill=bg_card, outline=border_col, width=border_w)

        # Image thumbnail
        th_h = 200
        thumb = Image.open(p['photo']).convert('RGBA')
        # Crop thumb
        t_ratio = thumb.width / thumb.height
        target_r = (col_w - 20) / th_h
        if t_ratio > target_r:
            nh = th_h
            nw = int(nh * t_ratio)
        else:
            nw = col_w - 20
            nh = int(nw / t_ratio)
        thumb = thumb.resize((nw, nh), Image.Resampling.LANCZOS)
        tl = (nw - (col_w - 20)) // 2
        tt = (nh - th_h) // 2
        thumb = thumb.crop((tl, tt, tl + col_w - 20, tt + th_h))
        
        # Mask rounded corners for image
        mask = Image.new('L', (col_w - 20, th_h), 0)
        mask_draw = ImageDraw.Draw(mask)
        mask_draw.rounded_rectangle([0, 0, col_w - 20, th_h], radius=12, fill=255)
        slide.paste(thumb, (cx + 10, card_y + 10), mask)

        # Badge pill
        bbox = f_badge.getbbox(p['badge'])
        bw = bbox[2] - bbox[0] + 24
        draw.rounded_rectangle([cx + 20, card_y + 20, cx + 20 + bw, card_y + 52], radius=16, fill=p['badge_bg'])
        draw.text((cx + 32, card_y + 26), p['badge'], font=f_badge, fill=WHITE if p['badge_bg'] != CYAN else (10, 14, 22, 255))

        # Title
        content_y = card_y + th_h + 25
        draw.text((cx + 20, content_y), p['title'], font=f_p_title, fill=WHITE)
        draw.text((cx + 20, content_y + 36), p['sub'], font=f_p_sub, fill=MUTED)

        # Price box
        price_y = content_y + 75
        draw.rounded_rectangle([cx + 18, price_y, cx + col_w - 18, price_y + 90], radius=12, fill=(8, 12, 20, 240), outline=(30, 45, 70, 255), width=1)
        
        draw.text((cx + 30, price_y + 12), p['price'], font=f_p_price, fill=CYAN)
        p_bbox = f_p_price.getbbox(p['price'])
        pw = p_bbox[2] - p_bbox[0]
        draw.text((cx + 35 + pw, price_y + 30), p['unit'], font=f_p_unit, fill=WHITE)
        draw.text((cx + 30, price_y + 60), p['sec'], font=f_p_sec, fill=ORANGE)

        # Features list
        f_start_y = price_y + 115
        for fi, feat in enumerate(p['features']):
            fy = f_start_y + fi * 42
            draw_vector_check(draw, cx + 24, fy + 2, size=16, color=CYAN, width=2)
            draw.text((cx + 50, fy), feat, font=f_p_feat, fill=(230, 238, 248, 255))

        # CTA Button inside card
        cta_y = card_y + card_h - 65
        cta_bg = CYAN if p['highlight'] else (30, 45, 70, 255)
        cta_fg = (10, 14, 22, 255) if p['highlight'] else WHITE
        draw.rounded_rectangle([cx + 20, cta_y, cx + col_w - 20, cta_y + 45], radius=10, fill=cta_bg)
        f_btn = ImageFont.truetype(FONT_SEGOE_B, 18)
        btn_txt = 'CONTRATAR AGORA' if p['highlight'] else 'CONSULTAR VAGAS'
        b_box = f_btn.getbbox(btn_txt)
        bx = cx + (col_w - (b_box[2] - b_box[0])) // 2
        draw.text((bx, cta_y + 11), btn_txt, font=f_btn, fill=cta_fg)

    # Bottom Footer Strip
    foot_y = 980
    draw.rounded_rectangle([40, foot_y, W - 40, foot_y + 70], radius=14, fill=(15, 21, 33, 240), outline=(0, 229, 255, 60), width=1)
    f_strip = ImageFont.truetype(FONT_SEGOE_B, 18)
    draw.text((70, foot_y + 24), 'INCLUSO EM TODOS OS PLANOS:', font=f_strip, fill=CYAN)
    
    f_strip_body = ImageFont.truetype(FONT_SEGOE, 18)
    draw.text((400, foot_y + 24), 'Wi-Fi 500MB • Café Cortesia • Recepção • Estacionamento • Climatização', font=f_strip_body, fill=WHITE)
    
    f_strip_cta = ImageFont.truetype(FONT_SEGOE_B, 19)
    draw.text((W - 370, foot_y + 24), 'Agende sua visita: (11) 97427-1649', font=f_strip_cta, fill=ORANGE)

    out_file = 'presentation_cards/card_6_apresentacao_completa_1920x1080.jpg'
    slide.convert('RGB').save(out_file, quality=95)
    print(f'Generated {out_file}')

generate_slide_1920()
