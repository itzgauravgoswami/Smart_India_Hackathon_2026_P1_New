# EcoNest AI Dataset & Domain Adaptation Strategy

## Overview

The EcoNest classification engine is designed around a multi-tier pipeline:
1. **Zero-Shot Vision Foundation**: Leverages Gemini 1.5 Flash Vision for multi-stream reasoning and contamination identification.
2. **Local Edge Inference**: Planned on-device MobileNetV3 / YOLOv8 fine-tuning for low-bandwidth kiosks.

---

## 1. Supported Open Benchmark Datasets

EcoNest's reference training pipeline integrates data from:

- **TrashNet**: 2,527 images across 6 classes (glass, paper, cardboard, plastic, metal, trash).
- **TACO (Trash Annotations in Context)**: 1,500+ high-resolution images with fine-grained segmentation masks in wild environments.
- **RealWaste**: 4,752 photographic waste specimens across 9 categories.

---

## 2. Indian Campus Domain Adaptation

> **Note on Generalization**: Standard global datasets (e.g. TrashNet) predominantly contain European and North American consumer packaging. They do not automatically provide accurate classification for Indian collegiate environments without domain adaptation.

To address this, EcoNest incorporates:
- **Campus Stream Mapping**:
  - `Dry Waste`: Blue Bin (notebooks, PET beverage bottles, tetrapaks, metal cans, clean meal wrapping)
  - `Wet Waste`: Green Bin (dal/curry scraps, vegetable peelings, biodegradable tea cups, fruit skins)
  - `Sanitary Waste`: Yellow/Red Bin (used tissues, face masks, personal hygiene items)
  - `Special Care Waste`: Red Bin (lab lithium cells, soldering clippings, chemical reagents)
- **Active Contamination Auditing**: Food grease staining on paper cardboards is explicitly segmented as a contamination anomaly rather than simply being misclassified as organic waste.
