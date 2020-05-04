from enum import auto, Flag

class mods(Flag):
    NoMod               = 0
    NoFail              = auto()
    Easy                = auto()
    TouchDevice         = auto()
    Hidden              = auto()
    HardRock            = auto()
    SuddenDeath         = auto()
    DoubleTime          = auto()
    Relax               = auto()
    HalfTime            = auto()
    Nightcore           = auto()    # Only set along with DoubleTime. i.e: NC only gives 576
    Flashlight          = auto()
    Autoplay            = auto()
    SpunOut             = auto()
    Relax2              = auto()   # Autopilot
    Perfect             = auto()   # Only set along with SuddenDeath. i.e: PF only gives 16416
    Key4                = auto()
    Key5                = auto()
    Key6                = auto()
    Key7                = auto()
    Key8                = auto()
    FadeIn              = auto()
    Random              = auto()
    Cinema              = auto()
    Target              = auto()
    Key9                = auto()
    KeyCoop             = auto()
    Key1                = auto()
    Key3                = auto()
    Key2                = auto()
    ScoreV2             = auto()
    Mirror              = auto()
    KeyMod              = Key1 | Key2 | Key3 | Key4 | Key5 | Key6 | Key7 | Key8 | Key9 | KeyCoop
    FreeModAllowed      = NoFail | Easy | Hidden | HardRock | SuddenDeath | Flashlight | FadeIn | Relax | Relax2 | SpunOut | KeyMod
    ScoreIncreaseMods   = Hidden | HardRock | DoubleTime | Flashlight | FadeIn

def formatMods(mod):
    modf = str(mods(mod))[5:].split('|')
    return modf