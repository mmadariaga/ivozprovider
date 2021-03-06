.. _god_services:

########
Services
########

There are **special services** that can be accessed by calling to some codes
**from the terminal**.

.. danger:: Services defined in this section **are not accessible during a
   conversation**. They are activated by **calling the codes**, not using
   DTMF codes while talking.

There are the folowing **special services** avaialble in the section **Global
configuration** > **Services**:

.. ifconfig:: language == 'en'

    .. image:: img/en/services_god.png

.. ifconfig:: language == 'es'

    .. image:: img/es/services_god.png

.. glossary::

    Direct pickup
        This service allows capturing a ringing call from another terminal by
        calling the code followed by the extension from the target user.

    Group pickup
        This service allows capturing a ringing call for any terminal whose user
        is part of one of the capturer pickup groups.

    Check voicemail
        This service allows checking the user's voicemail using an interactive
        menu from which new voicemails can be listen, deleted, etc. This is an
        active alternative to receive voicemails via the email. Since 1.4, this
        service allows optional extension after the service code to check
        another users voicemails. Users can protect their voicemail using the
        internal menu options.

    Record locution
        This service allows any user to record their company's locutions by
        dialing an special code. Voice instructions will be provided in the
        user's language.

As soon as new services are implemented into IvozProvider, they will be listed
in this section.

.. attention:: This section lists the available services and the default codes
   when a **new brand** is created.

.. hint:: Changing the default code in this section will only affect new
   created brands.