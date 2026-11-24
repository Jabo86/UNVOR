import unittest

from tools.apk_signer import single_signer_sha256

FINGERPRINT = "bb91498c1f37dd44b5087266e97a1e8ba7013de896dd2b85e16c6ef904cc42f0"

class ApkSignerTests(unittest.TestCase):
    def test_legacy(self):
        text = "Number of signers: 1\nSigner #1 certificate SHA-256 digest: " + FINGERPRINT
        self.assertEqual(single_signer_sha256(text), FINGERPRINT)

    def test_sdk_37(self):
        text = ("Verifies\nVerified using v2 scheme (APK Signature Scheme v2): true\n"
                "Verified using v3 scheme (APK Signature Scheme v3): true\n"
                "Number of signers: 1\nV3.0 Signer: certificate SHA-256 digest: " + FINGERPRINT
                + "\nV3.0 Signer: public key SHA-256 digest: " + "f" * 64)
        self.assertEqual(single_signer_sha256(text), FINGERPRINT)

    def test_multiple_signers_rejected(self):
        with self.assertRaises(ValueError):
            single_signer_sha256("Number of signers: 2\nSigner #1 certificate SHA-256 digest: " + FINGERPRINT)

    def test_missing_count_rejected(self):
        with self.assertRaises(ValueError):
            single_signer_sha256("Signer #1 certificate SHA-256 digest: " + FINGERPRINT)

    def test_conflicting_fingerprints_rejected(self):
        with self.assertRaises(ValueError):
            single_signer_sha256("Number of signers: 1\nSigner #1 certificate SHA-256 digest: "
                                 + FINGERPRINT + "\nV3.0 Signer: certificate SHA-256 digest: " + "a"*64)

    def test_invalid_digest_rejected(self):
        with self.assertRaises(ValueError):
            single_signer_sha256("Number of signers: 1\nV3.0 Signer: certificate SHA-256 digest: abc")

    def test_public_key_only_rejected(self):
        with self.assertRaises(ValueError):
            single_signer_sha256("Number of signers: 1\nV3.0 Signer: public key SHA-256 digest: " + FINGERPRINT)

if __name__ == "__main__":
    unittest.main()
