
import streamlit as st
import fitz  # PyMuPDF
from io import BytesIO

st.set_page_config(page_title="Kreiranje treninga", layout="centered")
st.title("Kreiranje treninga")

# Korisnički unosi
datum = st.date_input("Datum").strftime("%d.%m.%Y.")
kategorija = st.selectbox(
    "Kategorija",
    [" ", "Škola košarke", "U12", "U14", "U16", "SEN"]
)
broj_treninga = st.number_input("Broj treninga", step=0, min_value=1)
broj_igraca = st.number_input("Broj igrača na treningu", step=1, min_value=1)
uvod = st.text_area("Uvod")
glavni_dio = st.text_area("Glavni dio")
zavrsni_dio = st.text_area("Završni dio")

if st.button("Generiraj PDF"):
    template_path = "spranca.pdf"
    font_path = "Roboto.ttf"  # mora biti u istom direktoriju

    doc = fitz.open(template_path)
    page = doc[0]

    font = fitz.Font(fontfile=font_path)
    fs_title = 18
    fs_text = 14

    # Dodavanje teksta na okvirne pozicije (prilagodljivo)
    page.insert_text((110, 62), f"{datum}", fontsize=14, font=font)
    page.insert_text((110, 30), f"{kategorija}", fontsize=fs_title, font=font)
    page.insert_text((552, 30), f"{broj_treninga}", fontsize=fs_text, font=font)
    page.insert_text((552, 62), f"{broj_igraca}", fontsize=fs_text, font=font)
    page.insert_text((230, 165), uvod, fontsize=fs_text, font=font)
    page.insert_text((230, 325), glavni_dio, fontsize=fs_text, font=font)
    page.insert_text((230, 570), zavrsni_dio, fontsize=fs_text, font=font)

    # Spremanje u memoriju
    output_pdf = BytesIO()
    doc.save(output_pdf)
    doc.close()
    output_pdf.seek(0)

    # Preuzimanje
    st.success("PDF je generiran!")
    st.download_button("Preuzmi PDF", output_pdf, file_name="generirani_izlaz.pdf", mime="application/pdf")
